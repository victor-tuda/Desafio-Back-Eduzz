import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './dataSource';
import routers from './routes/routes';
import handleErrors from './middlewares/handleErrors';

const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000;

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(routers);
    app.use(handleErrors);

    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch(error => console.error('Error during Data Source initialization:', error));