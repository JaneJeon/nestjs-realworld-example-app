import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { API_KEY } from '../config';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.coingecko.com/api/v3',
      headers: { 'x-cg-demo-api-key': API_KEY },
    }),
  ],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
