import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCoinDto } from './coin.dto';
import { ICoinRO, ICoinsRO } from './coin.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Coin } from './coin.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { ApiService } from '../api/api.service';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: EntityRepository<Coin>,
    private readonly entityManager: EntityManager,
    private readonly apiService: ApiService,
  ) {}

  async create({ id }: CreateCoinDto): Promise<ICoinRO> {
    // Check if there's any existing first, to prevent unnecessary API calls
    const existing = await this.coinRepository.findOne(id);
    if (existing !== null)
      throw new HttpException('Coin already exists!', HttpStatus.CONFLICT);

    const { name, symbol } = await this.apiService.getCoin(id);

    const coin = new Coin();
    coin.id = id;
    coin.name = name;
    coin.ticker = symbol.toUpperCase();

    await this.entityManager.persistAndFlush(coin);

    return { coin };
  }

  async findAll(): Promise<ICoinsRO> {
    const coins = await this.coinRepository.findAll();
    return { coins };
  }

  async getCoinIds(): Promise<string[]> {
    const { coins } = await this.findAll();
    return coins.map((coin) => coin.id);
  }
}
