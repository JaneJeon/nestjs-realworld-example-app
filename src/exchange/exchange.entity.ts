import { Entity, PrimaryKey, Property } from '@mikro-orm/mysql';

@Entity()
export class Exchange {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;
}
