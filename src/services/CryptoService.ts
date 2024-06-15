import { TickerResponse } from '../interfaces/crypto';
import CryptoApi from '../support/Libraries/CryptoApi';
import Exception from '../helpers/api-errors';
import { Request } from 'express';

class CryptoService {
  public async getCryptoApi(req: Request): Promise<TickerResponse> {
    try {
      const crypto = await CryptoApi.getCryptoApi(req);
      return crypto;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', req.path);
    }
  }
}

export default new CryptoService();