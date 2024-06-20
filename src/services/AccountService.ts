import { accountRepository } from '../repositories/AccountRepository';
import Exception from '../helpers/exception';
import { AccountDeposit, Account } from '../interfaces/account';
import { Account as AccountEntity } from '../entities/Account';
import EmailService from '../services/EmailService';
import bcrypt from 'bcrypt';

class AccountService {
  public async create(name: string, email: string, password: string): Promise<Account> {
    try {
      const accountExists = await accountRepository.findOneBy({ email });
      if (accountExists) {
        throw new Exception(401, 'E-mail already exists', '/account');
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newAccount = accountRepository.create({
        name,
        email,
        balance: '0',
        password: hashPassword
      });

      await accountRepository.save(newAccount);
      const { password: _, ...accountData } = newAccount;

      return accountData;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', '/account');
    }
  }

  public async getAccount(accountData: Account | any): Promise<Account | any> {
    try {
      if (!accountData) throw new Exception(404, 'Account not found. Do a POST at login route in API', '/account');
      return accountData;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', '/account');
    }
  }

  public async getAccountBalance(accountData: Account | any): Promise<string | any> {
    if (!accountData) throw new Exception(404, 'Account not found. Do a POST at login route in API', '/account/balance');
    return {
      balance: accountData.balance
    };
  }

  public async deposit(amount: string, id: any): Promise<AccountDeposit> {
    try {
      const accountFromDB = await accountRepository.findOneBy({ id });
      const { name, email, balance }: any = accountFromDB;

      const newAmount = String(parseFloat(balance) + parseFloat(amount));
      await accountRepository.createQueryBuilder().update(AccountEntity).set({ balance: newAmount }).where('id = :id', { id }).execute();

      await EmailService.sendEmail(email, 'A deposit has been made!', `A deposit of ${amount} reais has been made to your account!`);

      const accountNewBalance = this.accountData(id, name, email, newAmount);
      return accountNewBalance;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', '/account/deposit');
    }
  }

  private accountData(id: string, name: string, email: string, newAmount: string): AccountDeposit {
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