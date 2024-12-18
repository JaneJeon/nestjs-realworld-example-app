import { Exchange } from './exchange.entity';

type IExchange = Omit<Exchange, 'quotes'>;

export interface IExchangeRO {
  exchange: IExchange;
}

export interface IExchangesRO {
  exchanges: IExchange[];
}
