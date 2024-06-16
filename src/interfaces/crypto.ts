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

export interface CotationResponse {
  btc: {
    cotation: string;
    buy: string;
    sell: string;
  };
}

export interface BuyCrypto {
  investment: {
    account_id: string,
    name: string,
    value_invested: string,
    btc_received: string
  }
}

export interface PositionCrypto {
  account_id: string,
  name: string,
  investments: [{
    date_of_purchase: string,
    value_invested: string,
    value_of_btc_on_date_of_purchase: string,
    pct_of_variation: string,
    current_gross_value: string
  }]
}



