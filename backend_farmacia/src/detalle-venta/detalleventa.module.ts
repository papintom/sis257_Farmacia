import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalleventa.service';
import { DetalleVentaController } from './detalleventa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalleventa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService],
})
export class DetalleVentaModule {}
