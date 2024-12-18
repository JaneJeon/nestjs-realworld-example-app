import { Job } from 'bullmq';

import {
  FETCH_ALL_QUOTES_JOB_NAME,
  FETCH_QUOTES_FROM_EXCHANGE_JOB_NAME,
} from './constants';

interface FetchQuotesOnceJobData {
  idempotencyKey: string;
}

interface FetchQuotesFromExchangeJobData extends FetchQuotesOnceJobData {
  exchangeId: string;
  coinIds: string[];
}

export type FetchAllQuotesJob = Job<any> & {
  name: typeof FETCH_ALL_QUOTES_JOB_NAME;
};
export type FetchQuotesFromExchangeJob = Job<FetchQuotesFromExchangeJobData> & {
  name: typeof FETCH_QUOTES_FROM_EXCHANGE_JOB_NAME;
};
