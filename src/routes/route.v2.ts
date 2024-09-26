import { Router } from 'express';
import { enterDrawSchema } from '../participants/schemas/enter.draw.schema';
import { validateRequestSchema } from '../common/validations/validate.request.schema';
import { drawQueue } from '../queue/queue';
const router = Router();
router.post(
    '/participant/queue-enter',
    validateRequestSchema(enterDrawSchema),
    async (req, res) => {
        const { hkid, name, age } = req.body;

        // Add to the queue
        await drawQueue.add({ hkid, name, age });

        res.status(202).json({ message: 'Your request is being processed.' });
    }
);
export default router;