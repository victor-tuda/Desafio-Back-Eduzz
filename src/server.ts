import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import routers from './routes/routes';
import cors from 'cors';

// Criando uma aplicação express
const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

// Inicializando a conexão com o banco de dados
// e iniciando o server apenas se a conexão com o banco for bem sucedida
AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log('Server started');
    });
  })
  .catch(error => console.log(error));
