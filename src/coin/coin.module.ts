import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Coin } from './coin.entity';
import { UserModule } from '../user/user.module';
import { ApiModule } from '../api/api.module';

@Module({
  providers: [CoinService],
  controllers: [CoinController],
  imports: [
    MikroOrmModule.forFeature({ entities: [Coin] }),
    UserModule,
    ApiModule,
  ],
  exports: [CoinService],
})
export class CoinModule {}
