import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { Exchange } from './exchange.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '../user/user.module';
import { ApiModule } from '../api/api.module';

@Module({
  providers: [ExchangeService],
  controllers: [ExchangeController],
  imports: [
    MikroOrmModule.forFeature({ entities: [Exchange] }),
    UserModule,
    ApiModule,
  ],
})
export class ExchangeModule {}
