import { ConnectionOptions } from 'typeorm';
import { Draw } from '../draw/entities/draw.entity';
import { Participant } from '../participants/entities/participant.entity';
import * as dotenv from 'dotenv'; // CAN USE NEW VERSION OF DOTENV
dotenv.config();

export const appConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Draw, Participant],
    migrations: [],
    subscribers: [],
};
