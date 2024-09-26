import { getManager } from 'typeorm';
import { getRepository } from 'typeorm';
import { Participant } from '../entities/participant.entity';
import { EnterDraw } from '../interfaces/enter.draw.interface';
import { getActiveDrawOrThrowError } from '../../draw/helpers/draw.helper';
import { throwErrorIfParicipantAlreadyEntered } from '../helpers/participant.helper';

export class ParticipantService {
    async enterDraw({ hkid, name, age }: EnterDraw): Promise<Participant> {
        const participantRepository = getRepository(Participant);
        const activeDraw = await getActiveDrawOrThrowError();
        await throwErrorIfParicipantAlreadyEntered(hkid, activeDraw);

        if (activeDraw.enteredTickets >= activeDraw.totalTickets) {
            throw new Error('Maximum tickets for this draw have been reached.');
        }

        const participantCount = await participantRepository.count({
            where: { draw: activeDraw },
        });

        const participant = await getManager().transaction(async transactionalEntityManager => {
            const participant = participantRepository.create({
                name,
                hkid,
                age,
                ticketNumber: participantCount + 1,
                draw: activeDraw,
            });
            await transactionalEntityManager.save(participant);

            // Update the draw
            activeDraw.enteredTickets += 1;
            await transactionalEntityManager.save(activeDraw);

            return participant;
        });

        return participant;
    }
}
