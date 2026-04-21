import { Injectable } from '@nestjs/common';
import { CreateCategoríaDto } from './dto/create-categoria.dto';
import { UpdateCategoríaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoríaService {
  create(createCategoríaDto: CreateCategoríaDto) {
    return 'This action adds a new categoría';
  }

  findAll() {
    return `This action returns all categoría`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoría`;
  }

  update(id: number, updateCategoríaDto: UpdateCategoríaDto) {
    return `This action updates a #${id} categoría`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoría`;
  }
}
