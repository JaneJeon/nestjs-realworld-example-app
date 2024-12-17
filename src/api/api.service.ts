import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IGetExchangeRequest, IPingResponse } from './api.interface';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  ping(): Observable<AxiosResponse<IPingResponse>> {
    return this.httpService.get('/ping');
  }

  getExchange(id: string): Observable<AxiosResponse<IGetExchangeRequest>> {
    return this.httpService.get(`/exchanges/${id}`);
  }
}
