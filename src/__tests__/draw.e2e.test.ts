import request from 'supertest';
import app from '../app';
import { config } from '../config/test-datascource';
import { createConnection, Connection } from 'typeorm';

let connection: Connection;

beforeAll(async () => {
    connection = await createConnection(config);
});

beforeEach(async () => {
    if (connection) {
        await connection.synchronize(true);
    }
});

afterAll(async () => {
    if (connection) {
        await connection.close();
    }
});

describe('Draw API - Start draw', () => {
    it('should start a new draw', async () => {
        const response = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 100 });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.totalTickets).toBe(100);
    });

    it('should throw an error when starting a second draw while the first draw exists', async () => {
        // Start the first draw
        await request(app).post('/api/v1/draw/start').send({ totalTickets: 100 });

        // Attempt to start a second draw
        const response = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 200 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('A draw is already active.');
    });

    it('should throw 404 error when starting a new draw with totalTickets exceeding the 10**8 limit', async () => {
        const response = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 10 ** 8 + 1 });

        expect(response.status).toBe(400);
    });

    it('should throw an error when starting a new draw with missing totalTickets', async () => {
        const response = await request(app).post('/api/v1/draw/start').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('"totalTickets" is required');
    });

    it('should throw an error when starting a new draw with invalid totalTickets', async () => {
        const response = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: -1 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain(
            '"totalTickets" must be greater than or equal to 1'
        );
    });
});

describe('Draw API - End draw', () => {
    it('should end a draw', async () => {
        // Start a new draw
        const startResponse = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 100 });

        // End the draw
        const endResponse = await request(app).post('/api/v1/draw/end').send();

        expect(endResponse.status).toBe(200);
    });

    it('should end a draw when no participants are present', async () => {
        // Start a new draw
        const startResponse = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 100 });

        // End the draw
        const endResponse = await request(app).post('/api/v1/draw/end').send();

        expect(endResponse.status).toBe(200);
        expect(endResponse.body).not.toHaveProperty('winner');
    });

    it('should end a draw when participants are present and show the winner', async () => {
        // Start a new draw
        const startResponse = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 10 });

        // Enter a participant
        for (let i = 0; i < 5; i++) {
            await request(app)
                .post('/api/v1/participant/enter')
                .send({
                    hkid: `A123456(${i + 1})`,
                    name: `John ${i}`,
                    age: 30,
                });
        }

        // End the draw
        const endResponse = await request(app)
            .post('/api/v1/draw/end')
            .send({ id: startResponse.body.id });

        expect(endResponse.status).toBe(200);
        expect(endResponse.body).toHaveProperty('winner');
    });

    it('should end a draw and create a new draw if tickets available are more than half of total tickets', async () => {
        // Start a new draw
        const startResponse = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 5 });

        /// Enter a participant
        for (let i = 0; i < 5; i++) {
            await request(app)
                .post('/api/v1/participant/enter')
                .send({
                    hkid: `A123456(${i + 1})`,
                    name: `John ${i}`,
                    age: 30,
                });
        }

        // End the draw
        const endResponse = await request(app)
            .post('/api/v1/draw/end')
            .send({ id: startResponse.body.id });

        expect(endResponse.status).toBe(200);
        expect(endResponse.body).toHaveProperty('winner');

        // Check if a new draw is created
        const newDrawResponse = await request(app)
            .post('/api/v1/draw/start')
            .send({ totalTickets: 100 });

        expect(newDrawResponse.status).toBe(400);
        expect(newDrawResponse.body.error).toBe('A draw is already active.');
    });
});
