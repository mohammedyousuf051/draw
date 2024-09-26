import { getRepository } from 'typeorm';
import { Draw } from '../../draw/entities/draw.entity';


export async function getActiveDrawOrThrowError(): Promise<Draw> {
    const drawRepository = getRepository(Draw);

    const activeDraw = await drawRepository.findOne({
        where: { isActive: true },
    });
    if (!activeDraw) {
        throw new Error('No active draw found.');
    }
    return activeDraw;
}

export async function throwErrorIfDrawIsActive(): Promise<void> {
    const drawRepository = getRepository(Draw);

    const activeDraw = await drawRepository.findOne({
        where: { isActive: true },
    });
    
    if (activeDraw) {
        throw new Error('A draw is already active.');
    }
}