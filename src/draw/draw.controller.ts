import { Request, Response } from 'express';
import { DrawService } from './services/draw.service';

const drawService = new DrawService();

export class DrawController {
    static async getDraw(req: Request, res: Response) {
        try {
            const draw = await drawService.getActiveDraw();
            res.status(200).json(draw);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async startDraw(req: Request, res: Response) {
        const { totalTickets } = req.body;
        try {
            const draw = await drawService.startDraw(totalTickets);
            res.status(201).json(draw);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async endDraw(req: Request, res: Response) {
        try {
            const result = await drawService.endDraw();
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
}
