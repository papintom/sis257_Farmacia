import { Module } from '@nestjs/common';
import { VentaService } from './ventas.service';
import { VentaController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta])],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
