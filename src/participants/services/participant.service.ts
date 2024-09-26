import { getManager } from 'typeorm';
import { Participant } from '../entities/participant.entity';
import { Draw } from '../../draw/entities/draw.entity';
import { getRepository } from 'typeorm';
import { EnterDraw } from '../interfaces/enter.draw.interface';

export class ParticipantService {
    async enterDraw({ hkid, name, age }: EnterDraw): Promise<Participant> {
        const drawRepository = getRepository(Draw);
        const participantRepository = getRepository(Participant);

        // Check for an active draw
        const activeDraw = await drawRepository.findOne({
            where: { isActive: true },
        });
        if (!activeDraw) {
            throw new Error('No active draw found.');
        }

        // Check if the participant already entered the draw
        const existingParticipant = await participantRepository.findOne({
            where: { hkid, draw: activeDraw },
        });
        if (existingParticipant) {
            throw new Error(
                'Participant with this HKID has already entered the draw.'
            );
        }

        // Check if maximum ticket limit is reached
        if (activeDraw.enteredTickets >= activeDraw.totalTickets) {
            throw new Error('Maximum tickets for this draw have been reached.');
        }

        // Create a new participant
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
