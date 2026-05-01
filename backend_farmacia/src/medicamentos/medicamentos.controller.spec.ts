import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentoController } from './medicamentos.controller';
import { MedicamentoService } from './medicamentos.service';

describe('MedicamentoController', () => {
  let controller: MedicamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentoController],
      providers: [MedicamentoService],
    }).compile();

    controller = module.get<MedicamentoController>(MedicamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
