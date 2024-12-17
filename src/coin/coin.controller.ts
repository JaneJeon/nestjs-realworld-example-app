import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './coin.dto';
import { ICoinRO, ICoinsRO } from './coin.interface';

@ApiBearerAuth()
@ApiTags('coins')
@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() coinData: CreateCoinDto): Promise<ICoinRO> {
    return this.coinService.create(coinData);
  }

  @Get()
  async findAll(): Promise<ICoinsRO> {
    return this.coinService.findAll();
  }
}
