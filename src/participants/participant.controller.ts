import { Request, Response } from 'express';
import { ParticipantService } from './services/participant.service';
import { EnterDraw } from './interfaces/enter.draw.interface';

const participantService = new ParticipantService();

export class ParticipantController {
    static async enterDraw(req: Request, res: Response) {
        const { hkid, name, age }: EnterDraw = req.body;
        try {
            const participant = await participantService.enterDraw({
                hkid,
                name,
                age,
            });
            res.status(201).json(participant);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
}
