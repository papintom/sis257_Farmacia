import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormasFarmaceuticasService } from './formas-farmaceuticas.service';
import { CreateFormasFarmaceuticaDto } from './dto/create-formas-farmaceutica.dto';
import { UpdateFormasFarmaceuticaDto } from './dto/update-formas-farmaceutica.dto';

@Controller('formas-farmaceuticas')
export class FormasFarmaceuticasController {
  constructor(private readonly formasFarmaceuticasService: FormasFarmaceuticasService) {}

  @Post()
  create(@Body() createFormasFarmaceuticaDto: CreateFormasFarmaceuticaDto) {
    return this.formasFarmaceuticasService.create(createFormasFarmaceuticaDto);
  }

  @Get()
  findAll() {
    return this.formasFarmaceuticasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formasFarmaceuticasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormasFarmaceuticaDto: UpdateFormasFarmaceuticaDto) {
    return this.formasFarmaceuticasService.update(+id, updateFormasFarmaceuticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formasFarmaceuticasService.remove(+id);
  }
}
