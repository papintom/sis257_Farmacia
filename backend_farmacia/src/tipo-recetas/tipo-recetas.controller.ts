import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoRecetasService } from './tipo-recetas.service';
import { CreateTipoRecetaDto } from './dto/create-tipo-receta.dto';
import { UpdateTipoRecetaDto } from './dto/update-tipo-receta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-recetas')
@Controller('tipo-recetas')
export class TipoRecetasController {
  constructor(private readonly tipoRecetasService: TipoRecetasService) {}

  @Post()
  create(@Body() createTipoRecetaDto: CreateTipoRecetaDto) {
    return this.tipoRecetasService.create(createTipoRecetaDto);
  }

  @Get()
  findAll() {
    return this.tipoRecetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoRecetasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoRecetaDto: UpdateTipoRecetaDto,
  ) {
    return this.tipoRecetasService.update(+id, updateTipoRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoRecetasService.remove(+id);
  }
}
