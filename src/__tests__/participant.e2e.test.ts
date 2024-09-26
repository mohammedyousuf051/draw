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

describe('Participant API', () => {
    it('should enter a draw successfully', async () => {
        // Start a new draw
        await request(app).post('/api/draw/start').send({ totalTickets: 100 });

        // Enter the draw
        const enterResponse = await request(app)
            .post('/api/participant/enter')
            .send({ hkid: 'A123456(0)', name: ' Doe', age: 30 });

        expect(enterResponse.status).toBe(201);
        expect(enterResponse.body).toHaveProperty('id');
        expect(enterResponse.body.name).toBe(' Doe');
        expect(enterResponse.body.hkid).toBe('A123456(0)');
        expect(enterResponse.body.age).toBe(30);
    });

    it('should throw an error when no active draw exists', async () => {
        const enterResponse = await request(app)
            .post('/api/participant/enter')
            .send({ hkid: 'A123456(4)', name: 'John', age: 30 });

        expect(enterResponse.status).toBe(400);
        expect(enterResponse.body).toHaveProperty('error');
        expect(enterResponse.body.error).toBe('No active draw found.');
    });

    it('should throw an error when the participant has already entered the draw', async () => {
        // Start a new draw
        const startResponse = await request(app)
            .post('/api/draw/start')
            .send({ totalTickets: 100 });

        // Enter the draw
        await request(app)
            .post('/api/participant/enter')
            .send({ hkid: 'A123456(7)', name: 'John Doe', age: 30 });

        // Attempt to enter the draw again
        const enterResponse = await request(app)
            .post('/api/participant/enter')
            .send({ hkid: 'A123456(7)', name: 'John Doe', age: 30 });

        expect(enterResponse.status).toBe(400);
        expect(enterResponse.body).toHaveProperty('error');
        expect(enterResponse.body.error).toBe(
            'Participant with this HKID has already entered the draw.'
        );
    });

    it('should throw an error when the maximum ticket limit is reached', async () => {
        // Start a new draw with 1 ticket
        const startResponse = await request(app)
            .post('/api/draw/start')
            .send({ totalTickets: 1 });

        // Enter the draw
        await request(app)
            .post('/api/participant/enter')
            .send({ hkid: 'A123456(1)', name: 'Jooe', age: 30 });

        // Attempt to enter the draw again
        const enterResponse = await request(app)
            .post('/api/participant/enter')
            .send({ hkid: 'B123456(7)', name: 'Jane', age: 25 });

        expect(enterResponse.status).toBe(400);
        expect(enterResponse.body).toHaveProperty('error');
        expect(enterResponse.body.error).toBe(
            'Maximum tickets for this draw have been reached.'
        );
    });
});
