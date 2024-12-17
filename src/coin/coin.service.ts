import { Injectable } from '@nestjs/common';
import { CreateCoinDto } from './coin.dto';
import { ICoinRO, ICoinsRO } from './coin.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Coin } from './coin.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: EntityRepository<Coin>,
    private readonly entityManager: EntityManager,
  ) {}

  async create({ id }: CreateCoinDto): Promise<ICoinRO> {
    const coin = new Coin(id);
    await this.entityManager.persistAndFlush(coin);

    return { coin };
  }

  async findAll(): Promise<ICoinsRO> {
    const coins = await this.coinRepository.findAll();
    return { coins };
  }
}
