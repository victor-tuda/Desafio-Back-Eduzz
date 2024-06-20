import { AppDataSource } from '../dataSource';
import { Account } from '../entities/Account';

export const accountRepository = AppDataSource.getRepository(Account);
