import { Test, TestingModule } from '@nestjs/testing';
import { CategoríaController } from './categoria.controller';
import { CategoríaService } from './categoria.service';

describe('CategoríaController', () => {
  let controller: CategoríaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoríaController],
      providers: [CategoríaService],
    }).compile();

    controller = module.get<CategoríaController>(CategoríaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
