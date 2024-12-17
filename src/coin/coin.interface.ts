import { Coin } from './coin.entity';

export interface ICoinRO {
  coin: Coin;
}

export interface ICoinsRO {
  coins: Coin[];
}
