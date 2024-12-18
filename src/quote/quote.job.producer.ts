import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';
import {
  SCHEDULE_QUOTE_JOBS_QUEUE,
  QUOTE_JOBS_QUEUE,
  FETCH_ALL_QUOTES_JOB_NAME,
  FETCH_QUOTES_FROM_EXCHANGE_JOB_NAME,
} from './constants';
import { FetchAllQuotesJob } from './quote.job.interface';
import { ExchangeService } from '../exchange/exchange.service';
import { CoinService } from '../coin/coin.service';

@Injectable()
@Processor(SCHEDULE_QUOTE_JOBS_QUEUE)
export class QuoteJobProducer extends WorkerHost {
  constructor(
    @InjectQueue(SCHEDULE_QUOTE_JOBS_QUEUE) private quoteJobsQueue: Queue,
    @InjectQueue(QUOTE_JOBS_QUEUE) private fetchQuotesQueue: Queue,
    private readonly exchangeService: ExchangeService,
    private readonly coinService: CoinService,
  ) {
    super();
  }

  async setupCronjob() {
    await this.quoteJobsQueue.add(FETCH_ALL_QUOTES_JOB_NAME, undefined, {
      repeat: {
        // run it every 30 minutes
        pattern: '*/30 * * * *',
      },
    });
  }

  async process(job: FetchAllQuotesJob) {
    await this.fetchQuotes(job.id);
  }

  // Break it down into individual "fetch quotes for exchange X" jobs
  async fetchQuotes(idempotencyKey = uuidv4()) {
    const { exchanges } = await this.exchangeService.findAll();
    const coinIds = await this.coinService.getCoinIds();

    const promises = exchanges.map((exchange) =>
      this.fetchQuotesFromExchange(exchange.id, idempotencyKey, coinIds),
    );

    await Promise.all(promises);
  }

  async fetchQuotesFromExchange(
    exchangeId: string,
    idempotencyKey = uuidv4(),
    coinIds?: string[],
  ) {
    if (!coinIds) {
      coinIds = await this.coinService.getCoinIds();
    }

    // Actually schedule the 'fetch quotes from an exchange' job
    await this.fetchQuotesQueue.add(FETCH_QUOTES_FROM_EXCHANGE_JOB_NAME, {
      idempotencyKey,
      exchangeId,
      coinIds,
    });
  }
}
