import { Processor, WorkerHost } from '@nestjs/bullmq';

import { QUOTE_JOBS_QUEUE } from './constants';
import { FetchQuotesFromExchangeJob } from './quote.job.interface';
import { ApiService } from '../api/api.service';
import { QuoteService } from './quote.service';

@Processor(QUOTE_JOBS_QUEUE)
export class QuoteJobWorker extends WorkerHost {
  constructor(
    private readonly apiService: ApiService,
    private readonly quoteService: QuoteService,
  ) {
    super();
  }

  async process(job: FetchQuotesFromExchangeJob) {
    const { idempotencyKey, exchangeId, coinIds } = job.data;

    const { tickers: rawQuotes } = await this.apiService.getExchangeTickers(
      exchangeId,
      coinIds,
    );

    await this.quoteService.createMany(idempotencyKey, exchangeId, rawQuotes);
    return;
  }
}
