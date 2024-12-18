import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosRequestConfig, AxiosError } from 'axios';
import {
  IGetCoinResponse,
  IGetExchangeResponse,
  IGetExchangeTickersResponse,
  IPingResponse,
} from './api.interface';

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);

  constructor(private readonly httpService: HttpService) {}

  private async makeRequest<ResponseType>(
    method: string,
    url: string,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url,
    };

    const request = this.httpService.request<ResponseType>(requestConfig);

    const response = await firstValueFrom(
      request.pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new HttpException(
            'Error while trying to contact CoinGecko API',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );

    return response.data;
  }

  ping(): Promise<IPingResponse> {
    return this.makeRequest<IPingResponse>('GET', '/ping');
  }

  getExchange(id: string): Promise<IGetExchangeResponse> {
    return this.makeRequest<IGetExchangeResponse>('GET', `/exchanges/${id}`);
  }

  getCoin(id: string): Promise<IGetCoinResponse> {
    return this.makeRequest<IGetCoinResponse>('GET', `/coins/${id}`);
  }

  getExchangeTickers(
    exchangeId: string,
    coinIds: string[],
  ): Promise<IGetExchangeTickersResponse> {
    const config: Partial<AxiosRequestConfig> = {
      params: {
        depth: true,
        coin_ids: coinIds.join(','),
      },
    };

    return this.makeRequest<IGetExchangeTickersResponse>(
      'GET',
      `/exchanges/${exchangeId}/tickers`,
      config,
    );
  }
}
