import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {

    let categoria = await this.categoriaRepository.findOneBy({
      nombre: createCategoriaDto.nombre.trim(),
    });

    if (categoria) {
      throw new ConflictException('La categoría ya existe');
    }

    categoria = new Categoria();
    Object.assign(categoria, createCategoriaDto);

    return this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
  return this.categoriaRepository.find({
    order: { id: 'ASC' }, 
    relations: ['medicamentos'], 
  });
}

async findOne(id: number): Promise<Categoria> {
  const categoria = await this.categoriaRepository.findOne({
    where: { id: id }, 
    //relations: ['medicamentos'],
  });

  if (!categoria) {
    throw new NotFoundException(`Categoría con id ${id} no encontrada`);
  }

  return categoria;
}

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<Categoria> {
    const categoria = await this.findOne(id);
    return this.categoriaRepository.softRemove(categoria);
  }
}
