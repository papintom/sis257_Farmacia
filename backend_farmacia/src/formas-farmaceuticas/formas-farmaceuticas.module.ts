import { Module } from '@nestjs/common';
import { FormasFarmaceuticasService } from './formas-farmaceuticas.service';
import { FormasFarmaceuticasController } from './formas-farmaceuticas.controller';
import { FormasFarmaceutica } from './entities/formas-farmaceutica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FormasFarmaceutica])],
  controllers: [FormasFarmaceuticasController],
  providers: [FormasFarmaceuticasService],
})
export class FormasFarmaceuticasModule {}
