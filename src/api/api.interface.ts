export interface IPingResponse {
  gecko_says: string;
}

export interface IGetExchangeResponse {
  name: string;
}

export interface IGetCoinResponse {
  id: string;
  symbol: string;
  name: string;
}

export interface IRawQuote {
  coin_id: string;
  target_coin_id: string;

  last: number;
  volume: number;

  cost_to_move_up_usd: number;
  cost_to_move_down_usd: number;
  bid_ask_spread_percentage: number;

  last_traded_at: string;
  last_fetch_at: string;
}

export interface IGetExchangeTickersResponse {
  name: string;
  tickers: IRawQuote[];
}
