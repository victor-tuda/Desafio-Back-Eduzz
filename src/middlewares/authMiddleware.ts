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
      throw new Exception(401, 'E-mail already exists', req.path); // TODO: refactor this line
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const accountId = await accountRepository.findOneBy({ id });

    // Throw an error if the id does not exists
    if (!accountId) {
      throw new Exception(401, 'E-mail already exists', req.path); // TODO: refactor this line
    }

    const { password: _, ...loggedAccount } = accountId;

    req.account = loggedAccount;

    next();
  } catch (error) {
    next(new Exception(500, 'Internal Server Error here', req.path)); // TODO: refactor this line
  }
};
