import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Exchange } from './exchange.entity';
import { ApiService } from '../api/api.service';
import { EntityManager } from '@mikro-orm/mysql';

describe('ExchangeService', () => {
  let service: ExchangeService;

  const EXCHANGES = [
    {
      id: 'binance',
      name: 'Binance',
    },
    { id: 'gdax', name: 'Coinbase' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: EntityManager,
          useValue: {
            persistAndFlush: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Exchange),
          useValue: {
            findAll: jest.fn().mockReturnValue(EXCHANGES),
            findOne: jest.fn(async (id) => {
              if (id === 'binance') return {};
              return null;
            }),
          },
        },
        {
          provide: ApiService,
          useValue: {
            getExchange: (id: string) => {
              if (id !== 'gdax') throw new Error('Unknown exchange!');
              return { name: 'Coinbase' };
            },
          },
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not add a duplicate exchange', async () => {
    await expect(service.create({ id: 'binance' })).rejects.toThrow(
      'Exchange already exists!',
    );
  });

  it('should handle non-existent exchanges', async () => {
    await expect(service.create({ id: 'foo' })).rejects.toThrow(
      'Unknown exchange!',
    );
  });

  it('should add an exchange to the monitored list', async () => {
    await expect(service.create({ id: 'gdax' })).resolves.toEqual({
      exchange: {
        id: 'gdax',
        name: 'Coinbase',
      },
    });
  });

  it('should list all exchanges', async () => {
    await expect(service.findAll()).resolves.toEqual({
      exchanges: EXCHANGES,
    });
  });
});
