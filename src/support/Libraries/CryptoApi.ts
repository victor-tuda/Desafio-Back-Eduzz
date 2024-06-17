import Axios, { AxiosInstance } from 'axios';
import Exception from '../../helpers/exception';
import { TickerResponse } from '../../interfaces/crypto';

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

  public async getCryptoApi(): Promise<TickerResponse> {
    try {
      const response = await this.axios.get<TickerResponse>('/BTC/ticker');
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw new Exception(500, 'Internal Server Error', 'crypto');
    }
  }
}

export default new CryptoApi();
