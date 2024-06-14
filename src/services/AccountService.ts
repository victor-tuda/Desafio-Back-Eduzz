import { AppDataSource } from "../data-source";
import { Account } from '../entities/Account';
import { IAccount } from '../interfaces/account';

const accoutRepository = AppDataSource.getRepository(Account);

const getAccount = (): Promise<IAccount[]> => {
    return accoutRepository.find()
}

export default { getAccount }