import { Module } from '@nestjs/common';
import { TipoRecetasService } from './tipo-recetas.service';
import { TipoRecetasController } from './tipo-recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoReceta } from './entities/tipo-receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoReceta])],
  controllers: [TipoRecetasController],
  providers: [TipoRecetasService],
  exports: [TipoRecetasService],
})
export class TipoRecetasModule {}
