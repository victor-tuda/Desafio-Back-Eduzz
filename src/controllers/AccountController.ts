import { Request, Response, NextFunction } from 'express';
import { accountRepository } from '../repositories/AccountRepository';
import Exception from '../helpers/api-errors';
import bcrypt from 'bcrypt';

class AccountController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const accountExists = await accountRepository.findOneBy({ email });
    
            if (accountExists) {
                throw new Exception(401, 'E-mail already exists', req.path);
            }
    
            const hashPassword = await bcrypt.hash(password, 10);
    
            const newAccount = accountRepository.create({
                email,
                password: hashPassword
            });
    
            await accountRepository.save(newAccount);
    
            const { password: _, ...accountData } = newAccount;
    
            return res.status(201).json(accountData);
        } catch (error) {
            next(new Exception(500, "Internal Server Error", req.path));
        }
    }
}

export default new AccountController;