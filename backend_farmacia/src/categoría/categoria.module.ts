import { Module } from '@nestjs/common';
import { CategoríaService } from './categoria.service';
import { CategoríaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoríaController],
  providers: [CategoríaService],
})
export class CategoríaModule {}
