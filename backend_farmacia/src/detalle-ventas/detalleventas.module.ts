import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalleventas.service';
import { DetalleVentaController } from './detalleventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalleventa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService],
})
export class DetalleVentaModule {}
