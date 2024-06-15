import Axios, { AxiosInstance } from 'axios';
import { NextFunction, Request } from 'express';
import Exception from '../../helpers/api-errors';

class CryptoApi {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async getCryptoApi(req:Request, next: NextFunction): Promise<any> {
    try {
      const cryptoData = await this.axios.get<any>('https://www.mercadobitcoin.net/api/BTC/ticker', {params: {}});
      console.log(cryptoData);

      return cryptoData;
    } catch (error) {
        next(new Exception(500, "Internal Server Error", req.path)); // TODO: refactor this line
    }
  }
}

export default new CryptoApi();
