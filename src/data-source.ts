import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Account } from './entities/Account';
import { CreateAccount1718324356043 } from './database/migrations/1718324356043-CreateAccount';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'eduzz-mysql.cinb14ueuryw.us-west-2.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: 'Eduzz_001',
  database: 'desafio_crypto',
  synchronize: true,
  logging: false,
  entities: [Account],
  migrations: [CreateAccount1718324356043],
  subscribers: []
});
