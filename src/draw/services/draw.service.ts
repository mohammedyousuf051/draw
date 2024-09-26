import { getManager } from 'typeorm';
import { getRepository } from 'typeorm';
import { Draw } from '../entities/draw.entity';
import { Participant } from '../../participants/entities/participant.entity';

export class DrawService {
    async getActiveDraw(): Promise<Draw> {
        const drawRepository = getRepository(Draw);
        return await drawRepository.findOneOrFail({
            where: { isActive: true },
        });
    }

    async startDraw(totalTickets: number): Promise<Draw> {
        const drawRepository = getRepository(Draw);
        const activeDraw = await drawRepository.findOne({
            where: { isActive: true },
        });

        if (activeDraw) {
            throw new Error('A draw is already active.');
        }
        const draw = drawRepository.create({ totalTickets });
        return await drawRepository.save(draw);
    }

    async endDraw(): Promise<{ winner: Participant }> {
        const drawRepository = getRepository(Draw);
        const draw = await drawRepository.findOne({
            where: { isActive: true },
            relations: ['participants'],
        });

        if (!draw) {
            throw new Error('No active draw found.');
        }

        // Randomly pick a winner
        const participantCount = draw.participants.length;
        const winnerIndex = Math.floor(Math.random() * participantCount);
        const winner = draw.participants[winnerIndex];

        //Delete the draw and participants
        await this.removeDrawAndParticipants(draw.id);

        if (participantCount > draw.totalTickets / 2) {
            await this.startDraw(draw.totalTickets);
        }

        return { winner };
    }

    async removeDrawAndParticipants(drawId: string): Promise<void> {
        const drawRepository = getRepository(Draw);
        const participantRepository = getRepository(Participant);

        const draw = await drawRepository.findOne({
            where: { id: drawId },
            relations: ['participants'],
        });
        if (!draw) {
            throw new Error('Draw not found.');
        }

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.remove(draw.participants);
            await transactionalEntityManager.remove(draw);
        });
    }
}
