import { Module } from '@nestjs/common';
import { MedicamentoService } from './medicamentos.service';
import { MedicamentoController } from './medicamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamento } from './entities/medicamento.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Medicamento])],
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
})
export class MedicamentoModule {}