import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import routers from './routes/routes';
import handleErrors from './middlewares/handleErrors';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(routers);
    app.use(handleErrors);

    app.listen(3000, () => {
      console.log('Server started');
    });
  })
  .catch(error => console.log(error));
