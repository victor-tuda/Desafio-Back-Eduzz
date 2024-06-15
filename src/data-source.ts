import 'reflect-metadata';
import 'dotenv/config'
import { DataSource } from 'typeorm';
import { Account } from './entities/Account';
import { CreateAccount1718324356043 } from './database/migrations/1718324356043-CreateAccount';

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  subscribers: []
});
