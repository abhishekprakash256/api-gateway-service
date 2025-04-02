import { Test, TestingModule } from '@nestjs/testing';
import { CmsApiService } from './cms-login-api.service';

describe('CmsApiService', () => {
  let service: CmsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsApiService],
    }).compile();

    service = module.get<CmsApiService>(CmsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
