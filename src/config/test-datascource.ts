import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Draw } from '../draw/entities/draw.entity';
import { Participant } from '../participants/entities/participant.entity';

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'test_user',
    password: 'test_password',
    database: 'test_lucky_draw',
    synchronize: true,
    logging: false,
    entities: [Draw, Participant],
};

let connection: Connection | null = null;
export async function getConnection() {
    if (connection) {
        return connection;
    }
    connection = await createConnection(config);
    return connection;
}

export async function closeConnection() {
    if (connection) {
        await connection.close();
        connection = null;
    }
}
