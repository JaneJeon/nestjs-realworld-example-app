import { Entity, PrimaryKey } from '@mikro-orm/mysql';

@Entity()
export class Coin {
  @PrimaryKey()
  id!: string;

  constructor(id: string) {
    this.id = id;
  }
}
