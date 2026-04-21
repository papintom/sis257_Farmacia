import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoríaService } from './categoria.service';
import { CreateCategoríaDto } from './dto/create-categoria.dto';
import { UpdateCategoríaDto } from './dto/update-categoria.dto';

@Controller('categoría')
export class CategoríaController {
  constructor(private readonly categoríaService: CategoríaService) {}

  @Post()
  create(@Body() createCategoríaDto: CreateCategoríaDto) {
    return this.categoríaService.create(createCategoríaDto);
  }

  @Get()
  findAll() {
    return this.categoríaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoríaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoríaDto: UpdateCategoríaDto) {
    return this.categoríaService.update(+id, updateCategoríaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoríaService.remove(+id);
  }
}
