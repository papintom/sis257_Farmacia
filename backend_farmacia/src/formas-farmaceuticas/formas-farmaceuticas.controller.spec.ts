import { Test, TestingModule } from '@nestjs/testing';
import { FormasFarmaceuticasController } from './formas-farmaceuticas.controller';
import { FormasFarmaceuticasService } from './formas-farmaceuticas.service';

describe('FormasFarmaceuticasController', () => {
  let controller: FormasFarmaceuticasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormasFarmaceuticasController],
      providers: [FormasFarmaceuticasService],
    }).compile();

    controller = module.get<FormasFarmaceuticasController>(FormasFarmaceuticasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
