import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/route';
import { setupSwagger } from './config/swagger';

const app = express();
app.use(bodyParser.json());

app.use('/api', routes);
setupSwagger(app);

export default app;
