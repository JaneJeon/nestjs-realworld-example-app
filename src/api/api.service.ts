import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { IGetExchangeRequest, IPingResponse } from './api.interface';

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);

  constructor(private readonly httpService: HttpService) {}

  private async makeRequest<ResponseType, DataType = unknown>(
    method: string,
    url: string,
    data?: DataType,
  ) {
    const config: AxiosRequestConfig<DataType> = {
      method,
      url,
      data,
    };

    const request = this.httpService.request<ResponseType>(config);

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
    return this.makeRequest('GET', '/ping');
  }

  getExchange(id: string): Promise<IGetExchangeRequest> {
    return this.makeRequest('GET', `/exchanges/${id}`);
  }
}
