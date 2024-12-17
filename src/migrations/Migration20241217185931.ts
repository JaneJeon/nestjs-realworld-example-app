import { Migration } from '@mikro-orm/migrations';

export class Migration20241217185931 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`exchange\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`exchange\`;`);
  }
}
