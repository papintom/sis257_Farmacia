import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalleventas.service';
import { DetalleVentaController } from './detalleventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalleventa.entity';
import { Lote } from 'src/lotes/entities/lote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta, Lote])],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService],
})
export class DetalleVentaModule {}
