import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/mysql';
import { Coin } from '../coin/coin.entity';
import { Exchange } from '../exchange/exchange.entity';

@Entity()
export class Quote {
  @PrimaryKey()
  jobId!: string;

  @ManyToOne(() => Exchange, { primary: true })
  exchange!: Exchange;

  [PrimaryKeyProp]?: ['jobId', 'exchangeId'];

  @ManyToOne(() => Coin)
  baseCoin!: Coin;

  @Property()
  pairCoinId!: string;

  @Property()
  bidInDollars!: number;

  @Property()
  askInDollars!: number;

  @Property()
  costToMove2PercentUpInDollars!: number;

  @Property()
  costToMove2PercentDownInDollars!: number;

  @Property()
  volumeInDollars!: number;

  @Property()
  fetchedAt!: Date;

  @Property()
  effectiveAt!: Date;
}
