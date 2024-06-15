import { Request, Response, NextFunction } from 'express';
import Exception from '../helpers/api-errors';
import CryptoService from '../services/CryptoService';

class CryptoController {
  async getCryptoApi(req: Request, res: Response, next: NextFunction) {
    try {
      const crypto = await CryptoService.getCryptoApi(req);
      console.log(crypto);
      return res.json(crypto);
    } catch (error) {
      next(new Exception(500, 'Internal Server Error', req.path));
    }
  }
}

export default new CryptoController();