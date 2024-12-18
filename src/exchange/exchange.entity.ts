import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/mysql';
import { Quote } from '../quote/quote.entity';

@Entity()
export class Exchange {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @OneToMany(() => Quote, (quote) => quote.exchange, { lazy: true })
  quotes = new Collection<Quote>(this);
}
