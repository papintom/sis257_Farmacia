import { Test, TestingModule } from '@nestjs/testing';
import { FormasFarmaceuticasService } from './formas-farmaceuticas.service';

describe('FormasFarmaceuticasService', () => {
  let service: FormasFarmaceuticasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormasFarmaceuticasService],
    }).compile();

    service = module.get<FormasFarmaceuticasService>(FormasFarmaceuticasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
