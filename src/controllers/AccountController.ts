import { Request, Response, NextFunction } from 'express';
import { accountRepository } from '../repositories/AccountRepository';
import Exception from '../helpers/api-errors';
import bcrypt from 'bcrypt';

class AccountController {
  // Create an account
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      // Search for an account with the same email
      const accountExists = await accountRepository.findOneBy({ email });

      // Throw an error if the email already exists
      if (accountExists) {
        throw new Exception(401, 'E-mail already exists', req.path); // TODO: refactor this line
      }

      // Hash the password with bcrypt
      const hashPassword = await bcrypt.hash(password, 10);

      // Create an new object with the hashed password
      const newAccount = accountRepository.create({
        name,
        email,
        password: hashPassword
      });

      console.log(newAccount);

      // Save into the database
      await accountRepository.save(newAccount);

      // Create a response to the client without the password field
      const { password: _, ...accountData } = newAccount;

      // Return this new response
      return res.status(201).json(accountData);
    } catch (error) {
      next(new Exception(500, 'Internal Server Error', req.path)); // TODO: refactor this line
    }
  }

  async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(req.account);
    } catch (error) {
      next(new Exception(500, 'Internal Server Error', req.path)); // TODO: refactor this line
    }
  }

}

export default new AccountController();
