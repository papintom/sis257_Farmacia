import { Test, TestingModule } from '@nestjs/testing';
import { CategoríaService } from './categoria.service';

describe('CategoríaService', () => {
  let service: CategoríaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoríaService],
    }).compile();

    service = module.get<CategoríaService>(CategoríaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
