import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { ApiModule } from './api.module';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('works', async () => {
    // Make actual live request just to make sure it works.
    // All other requests will be mocked for the sake of saving on API calls.
    const data = await service.ping();

    expect(data.gecko_says).not.toBeFalsy();
  });
});
