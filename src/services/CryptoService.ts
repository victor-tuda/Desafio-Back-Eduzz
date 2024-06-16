import { CotationResponse, TickerResponse } from '../interfaces/crypto';
import CryptoApi from '../support/Libraries/CryptoApi';
import Exception from '../helpers/api-errors';
import { Request } from 'express';

class CryptoService {
  public async getCryptoApi(req: Request): Promise<CotationResponse> {
    try {
      const crypto = await CryptoApi.getCryptoApi(req);
      const cryptoCotation = this.cotationData(crypto);
      return cryptoCotation;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', req.path);
    }
  }

  private cotationData(crypto: TickerResponse): CotationResponse {
    return {
      btc: {
        cotation: crypto.ticker.last,
        buy: crypto.ticker.buy,
        sell: crypto.ticker.sell
      }
    };
  }
}

export default new CryptoService();
