import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { CreateExchangeDto } from './exchange.dto';

describe('ExchangeController', () => {
  let controller: ExchangeController;

  const EXCHANGES = [{ id: 'binance', name: 'Binance' }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        {
          provide: ExchangeService,
          useFactory: jest.fn(() => ({
            create: async (dto: CreateExchangeDto) => ({
              exchange: {
                id: dto.id,
                name: dto.id.toUpperCase(),
              },
            }),
            findAll: async () => ({
              exchanges: EXCHANGES,
            }),
          })),
        },
      ],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of exchanges being monitored', async () => {
    await expect(controller.findAll()).resolves.toEqual({
      exchanges: EXCHANGES,
    });
  });

  it('should add exchange to the monitored list', async () => {
    await expect(controller.create({ id: 'hello' })).resolves.toEqual({
      exchange: {
        id: 'hello',
        name: 'HELLO',
      },
    });
  });
});
