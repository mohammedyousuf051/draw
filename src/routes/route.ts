import { Router } from 'express';
import { DrawController } from '../draw/draw.controller';
import { ParticipantController } from '../participants/participant.controller';
import { validateRequestSchema } from '../common/validations/validate.request.schema';
import { startDrawSchema } from '../draw/schemas/start.draw.schema';
import { enterDrawSchema } from '../participants/schemas/enter.draw.schema';

const router = Router();

/**
 * @swagger
 * /draw:
 *   get:
 *     summary: Get Active Draw
 *     tags: [Draw]
 *     responses:
 *       200:
 *         description: Successfully retrieved the active draw
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The draw ID
 *                 totalTickets:
 *                   type: integer
 *                   description: The total number of tickets for the draw
 *                 enteredTickets:
 *                   type: integer
 *                   description: The number of tickets entered in the draw
 *                 isActive:
 *                   type: boolean
 *                   description: Whether the draw is active
 *       404:
 *         description: No active draw found
 */
router.get('/draw', DrawController.getDraw);

/**
 * @swagger
 * /draw/start:
 *   post:
 *     summary: Start a new draw
 *     tags: [Draw]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalTickets:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Draw started successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/draw/start',
    validateRequestSchema(startDrawSchema),
    DrawController.startDraw
);

/**
 * @swagger
 * /draw/end:
 *   post:
 *     summary: End the current draw
 *     tags: [Draw]
 *     responses:
 *       200:
 *         description: Draw ended successfully
 *       400:
 *         description: Bad request
 */
router.post('/draw/end', DrawController.endDraw);

/**
 * @swagger
 * /participant/enter:
 *   post:
 *     summary: Enter the draw
 *     tags: [Participant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               hkid:
 *                 type: string
 *                 example: A123456(7)
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Entered draw successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/participant/enter',
    validateRequestSchema(enterDrawSchema),
    ParticipantController.enterDraw
);

export default router;
