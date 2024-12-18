import { Migration } from '@mikro-orm/migrations';

export class Migration20241218011013 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`quote\` (\`job_id\` varchar(255) not null, \`exchange_id\` varchar(255) not null, \`base_coin_id\` varchar(255) not null, \`pair_coin_id\` varchar(255) not null, \`bid_in_dollars\` int not null, \`ask_in_dollars\` int not null, \`cost_to_move2percent_up_in_dollars\` int not null, \`cost_to_move2percent_down_in_dollars\` int not null, \`volume_in_dollars\` int not null, \`fetched_at\` datetime not null, \`effective_at\` datetime not null, primary key (\`job_id\`, \`exchange_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`quote\` add index \`quote_exchange_id_index\`(\`exchange_id\`);`);
    this.addSql(`alter table \`quote\` add index \`quote_base_coin_id_index\`(\`base_coin_id\`);`);

    this.addSql(`alter table \`quote\` add constraint \`quote_exchange_id_foreign\` foreign key (\`exchange_id\`) references \`exchange\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`quote\` add constraint \`quote_base_coin_id_foreign\` foreign key (\`base_coin_id\`) references \`coin\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`quote\`;`);
  }

}
