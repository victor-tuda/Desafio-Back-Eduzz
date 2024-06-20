import { Request, Response, NextFunction } from 'express';
import CryptoService from '../services/CryptoService';

class CryptoController {
  async getCryptoApi(req: Request, res: Response, next: NextFunction) {
    try {
      const crypto = await CryptoService.getCryptoApi();
      return res.status(200).json(crypto);
    } catch (error) {
      next(error);
    }
  }

  async buyCrypto(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.account;
      const { amount } = req.body;
      const cryptoBuy = await CryptoService.buyCrypto(amount, id);

      return res.status(201).json(cryptoBuy);
    } catch (error) {
      next(error);
    }
  }

  async getPosition(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.account;
      const getPosition = await CryptoService.getPosition(id);

      return res.status(200).json(getPosition);
    } catch (error) {
      next(error);
    }
  }
}

export default new CryptoController();