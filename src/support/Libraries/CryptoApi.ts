import Axios, { AxiosInstance } from 'axios';
import Exception from '../../helpers/api-errors';
import { TickerResponse } from '../../interfaces/crypto';
import { Request } from 'express';

class CryptoApi {
  private axios: AxiosInstance;
  private readonly baseURL: string = 'https://www.mercadobitcoin.net/api';

  constructor() {
    this.axios = Axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async getCryptoApi(req: Request): Promise<TickerResponse> {
    try {
      console.log('teste');
      const response = await this.axios.get<TickerResponse>('/BTC/ticker');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw new Exception(500, 'Internal Server Error', req.path);
    }
  }
}

export default new CryptoApi();