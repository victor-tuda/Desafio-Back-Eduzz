import { Request, Response, Router } from 'express';
import { Account } from '../entities/Account';
import AccountService from '../services/AccountService'
import { IAccount } from '../interfaces/account'

const accountRouter = Router();

accountRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
    const accounts = await AccountService.getAccount();
    console.log("teste")    
    return res.status(200).json(accounts);
})


export default accountRouter




