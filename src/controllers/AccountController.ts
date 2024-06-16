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
      return res.json(req.account);
    } catch (error) {
      next(error);
    }
  }

  async getAccountBallance(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({
        balance: req.account.balance
      });
    } catch (error) {
      next(error);
    }
  }

  async deposit(req: Request, res: Response, next: NextFunction) {
    try {
      const amount = req.body.amount;
      const { id } = req.account;
      const deposit = await AccountService.deposit(amount, id);
      return res.json(deposit);
    } catch (error) {
      next(error);
    }
  }
}

export default new AccountController();