import Queue from 'bull';
import { ParticipantService } from '../participants/services/participant.service'

const drawQueue = new Queue('drawQueue', {
    redis: { host: 'localhost', port: 6379 },
});

const participantService = new ParticipantService();

drawQueue.process(async (job) => {
    const { hkid, name, age } = job.data;
    try {
        const participant = await participantService.enterDraw({ hkid, name, age });
        console.log(`User ${hkid} entered the draw successfully:`, participant);
    } catch (error) {
        console.error(`Failed to enter user ${hkid}`);
        throw error;
    }
});

export { drawQueue };