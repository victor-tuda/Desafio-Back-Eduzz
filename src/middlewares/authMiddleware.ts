import { accountRepository } from './../repositories/AccountRepository';
import { Request, Response, NextFunction } from 'express';
import Exception from '../helpers/exception';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Exception(401, 'Authorization header is missing', req.path);
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const account = await accountRepository.findOneBy({ id });

    if (!account) {
      throw new Exception(401, 'Invalid token', req.path);
    }

    const { password, ...loggedAccount } = account;
    req.account = loggedAccount;

    next();
  } catch (error) {
    next(new Exception(401, 'Unauthorized', req.path));
  }
};