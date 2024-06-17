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

  async buyCrypto(req: Request, res: Response, next: NextFunction) {
    try {
      // Call Crypto Service
      const { id } = req.account;
      const { amount } = req.body;
      const cryptoBuy = await CryptoService.buyCrypto(amount, id);

      return res.json(cryptoBuy);
    } catch (error) {
      next(error);
    }
  }

  async getPosition(req: Request, res: Response, next: NextFunction) {
    try {
      // Call Crypto Service
      const { id } = req.account;

      const getPosition = await CryptoService.getPosition(id);

      return res.json(getPosition);
    } catch (error) {
      next(error);
    }
  }
}

export default new CryptoController();
