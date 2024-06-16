import { accountRepository } from '../repositories/AccountRepository';
import Exception from '../helpers/api-errors';
import { Request } from 'express';
import { AccountDeposit } from '../interfaces/account';
import { Account } from '../entities/Account';

class AccountService {
  public async deposit(amount: string, id: any): Promise<AccountDeposit> {
    const accountFromDB = await accountRepository.findOneBy({ id });
    const { name, email, balance }: any = accountFromDB;

    // Validation for balance be a positive value

    const newAmount = String(parseFloat(balance) + parseFloat(amount));

    await accountRepository.createQueryBuilder().update(Account).set({ balance: newAmount }).where('id = :id', { id }).execute();

    const accountNewBalance = this.accountData(id, name, email, newAmount);

    return accountNewBalance;
  }

  private accountData(id: any, name: any, email: any, newAmount: string): AccountDeposit {
    return {
      new_balance: {
        id: id,
        name: name,
        email: email,
        balance: newAmount
      }
    };
  }
}

export default new AccountService();
