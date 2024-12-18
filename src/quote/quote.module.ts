import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteJobProducer } from './quote.job.producer';
import { BullModule } from '@nestjs/bullmq';
import { QUOTE_JOBS_QUEUE, SCHEDULE_QUOTE_JOBS_QUEUE } from './constants';
import { ExchangeModule } from '../exchange/exchange.module';
import { CoinModule } from '../coin/coin.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: SCHEDULE_QUOTE_JOBS_QUEUE }),
    BullModule.registerQueue({ name: QUOTE_JOBS_QUEUE }),
    ExchangeModule,
    CoinModule,
  ],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteJobProducer],
  exports: [QuoteJobProducer],
})
export class QuoteModule {}
