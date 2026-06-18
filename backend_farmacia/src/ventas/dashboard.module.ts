import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Venta } from '../ventas/entities/venta.entity';
import { Medicamento } from '../medicamentos/entities/medicamento.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Lote } from 'src/lotes/entities/lote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, Medicamento, Proveedor, Cliente, Lote]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}