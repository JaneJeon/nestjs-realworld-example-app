import { Entity, PrimaryKey, Property } from '@mikro-orm/mysql';

@Entity()
export class Coin {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  ticker!: string;

  constructor(id: string, name: string, ticker: string) {
    this.id = id;
    this.name = name;
    this.ticker = ticker.toUpperCase();
  }
}
