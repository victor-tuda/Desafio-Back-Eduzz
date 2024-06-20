import { NextFunction, Request, Response } from 'express';

class IndexController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        name: 'API Bitcoin',
        version: '1.0'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new IndexController();
