import { Request, Response, NextFunction } from 'express';
import AccountService from '../services/AccountService';

class AccountController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const accountData = await AccountService.create(name, email, password);
      return res.status(201).json(accountData);
    } catch (error) {
      next(error);
    }
  }

  async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const accountData = req.account;
      const account = await AccountService.getAccount(accountData);
      return res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }

  async getAccountBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const accountData = req.account;
      const balance = await AccountService.getAccountBalance(accountData);
      return res.status(200).json(balance);
    } catch (error) {
      next(error);
    }
  }

  async deposit(req: Request, res: Response, next: NextFunction) {
    try {
      const amount = req.body.amount;
      const { id } = req.account;
      const deposit = await AccountService.deposit(amount, id);
      return res.status(201).json(deposit);
    } catch (error) {
      next(error);
    }
  }
}

export default new AccountController();