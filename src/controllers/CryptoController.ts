import { Request, Response, NextFunction } from 'express';
import CryptoService from '../services/CryptoService';

class CryptoController {
  async getCryptoApi(req: Request, res: Response, next: NextFunction) {
    try {
      const crypto = await CryptoService.getCryptoApi();
      return res.json(crypto);
    } catch (error) {
      next(error);
    }
  }
}

export default new CryptoController();