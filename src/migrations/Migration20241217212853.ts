import { Migration } from '@mikro-orm/migrations';

export class Migration20241217212853 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`coin\` add \`name\` varchar(255) not null, add \`ticker\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`coin\` drop column \`name\`, drop column \`ticker\`;`);
  }

}
