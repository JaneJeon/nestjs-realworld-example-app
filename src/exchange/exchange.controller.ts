import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExchangeService } from './exchange.service';
import { IExchangeRO, IExchangesRO } from './exchange.interface';
import { CreateExchangeDto } from './exchange.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('exchanges')
@Controller('exchanges')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() exchangeData: CreateExchangeDto): Promise<IExchangeRO> {
    return this.exchangeService.create(exchangeData);
  }

  @Get()
  async findAll(): Promise<IExchangesRO> {
    return this.exchangeService.findAll();
  }
}
