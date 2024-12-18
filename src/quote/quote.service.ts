import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { IRawQuote } from '../api/api.interface';
import { Coin } from '../coin/coin.entity';
import { Exchange } from '../exchange/exchange.entity';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteService {
  constructor(private readonly entityManager: EntityManager) {}

  async createMany(jobId: string, exchangeId: string, rawQuotes: IRawQuote[]) {
    const exchange = this.entityManager.getReference(Exchange, exchangeId);

    for (const rawQuote of rawQuotes) {
      const quote = new Quote();
      quote.jobId = jobId;
      quote.exchange = exchange;

      quote.baseCoin = this.entityManager.getReference(Coin, rawQuote.coin_id);
      quote.pairCoinId = rawQuote.target_coin_id;

      // Calculate actual bid and ask values from the base price + spread percentage
      const price = rawQuote.last;
      const relativeSpread = rawQuote.bid_ask_spread_percentage;
      const absoluteSpread = price * relativeSpread;
      quote.bidInDollars = price - absoluteSpread / 2;
      quote.askInDollars = price + absoluteSpread / 2;

      quote.costToMove2PercentUpInDollars = rawQuote.cost_to_move_up_usd;
      quote.costToMove2PercentDownInDollars = rawQuote.cost_to_move_down_usd;
      quote.volumeInDollars = rawQuote.volume;

      quote.fetchedAt = new Date(rawQuote.last_fetch_at);
      quote.effectiveAt = new Date(rawQuote.last_traded_at);

      this.entityManager.persist(quote);
    }

    await this.entityManager.flush();
  }
}
