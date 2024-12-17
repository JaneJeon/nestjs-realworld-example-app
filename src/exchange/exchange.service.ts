import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Exchange } from './exchange.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { IExchangeRO, IExchangesRO } from './exchange.interface';
import { CreateExchangeDto } from './exchange.dto';
import { ApiService } from '../api/api.service';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private readonly exchangeRepository: EntityRepository<Exchange>,
    private readonly entityManager: EntityManager,
    private readonly apiService: ApiService,
  ) {}

  async create({ id }: CreateExchangeDto): Promise<IExchangeRO> {
    // Check if there's any existing first, to prevent unnecessary API calls
    const existingExchange = await this.exchangeRepository.findOne(id);
    if (existingExchange !== null)
      throw new HttpException('Exchange already exists!', HttpStatus.CONFLICT);

    // Make the API call to fetch exchange details
    const { name } = await this.apiService.getExchange(id);

    const exchange = new Exchange(id, name);
    await this.entityManager.persistAndFlush(exchange);

    return { exchange };
  }

  async findAll(): Promise<IExchangesRO> {
    const exchanges = await this.exchangeRepository.findAll();
    return { exchanges };
  }
}
