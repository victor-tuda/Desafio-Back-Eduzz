import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import routers from './routes/routes';
import handleErrors from './middlewares/error';



// Inicializando a conexão com o banco de dados
// e iniciando o server apenas se a conexão com o banco for bem sucedida
AppDataSource.initialize()
  .then(async () => {
    // Criando uma aplicação express
    const app = express();

    app.use(express.json());
    app.use(routers);
    app.use(handleErrors);

    app.listen(3000, () => {
      console.log('Server started');
    });
  })
  .catch(error => console.log(error));

