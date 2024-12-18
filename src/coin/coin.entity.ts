import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/mysql';
import { Quote } from '../quote/quote.entity';

@Entity()
export class Coin {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  ticker!: string;

  @OneToMany(() => Quote, (quote) => quote.baseCoin)
  quotes = new Collection<Quote>(this);
}
