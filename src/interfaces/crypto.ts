export interface TickerResponse {
    ticker: {
      high: string;
      low: string;
      vol: string;
      last: string;
      buy: string;
      sell: string;
      date: number;
    };
  }