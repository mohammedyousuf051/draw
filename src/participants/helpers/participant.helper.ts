import { getRepository } from 'typeorm';
import { Participant } from '../entities/participant.entity';
import { Draw } from '../../draw/entities/draw.entity';

export async function throwErrorIfParicipantAlreadyEntered(hkid: string, activeDraw: Draw): Promise<void> {
    const participantRepository = getRepository(Participant);
    const existingParticipant = await participantRepository.findOne({
        where: { hkid, draw: activeDraw },
    });
    if (existingParticipant) {
        throw new Error(
            'Participant with this HKID has already entered the draw.'
        );
    }
}