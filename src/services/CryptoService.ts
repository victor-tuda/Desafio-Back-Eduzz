import { CotationResponse, TickerResponse } from '../interfaces/crypto';
import CryptoApi from '../support/Libraries/CryptoApi';
import { Request } from 'express';

class CryptoService {
  public async getCryptoApi(): Promise<CotationResponse> {
    const crypto = await CryptoApi.getCryptoApi();
    const cryptoCotation = this.cotationData(crypto);
    return cryptoCotation;
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