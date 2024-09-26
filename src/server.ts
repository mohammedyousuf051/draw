import { createConnection } from 'typeorm';
import app from './app';
import { appConfig } from './config/datasource';

createConnection(appConfig)
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => console.log(error));
