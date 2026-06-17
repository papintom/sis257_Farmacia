import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTipoRecetaDto } from './dto/create-tipo-receta.dto';
import { UpdateTipoRecetaDto } from './dto/update-tipo-receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoReceta } from './entities/tipo-receta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoRecetasService {
  constructor(
    @InjectRepository(TipoReceta)
    private readonly tipoRecetaRepository: Repository<TipoReceta>,
  ) {}

  async create(createTipoRecetaDto: CreateTipoRecetaDto): Promise<TipoReceta> {
    const existe = await this.tipoRecetaRepository.findOne({
      where: { nombre: createTipoRecetaDto.nombre.trim() },
    });

    if (existe) {
      throw new ConflictException('El tipo de receta ya existe');
    }

    const nuevo = this.tipoRecetaRepository.create({
      ...createTipoRecetaDto,
      nombre: createTipoRecetaDto.nombre.trim(),
    });

    return this.tipoRecetaRepository.save(nuevo);
  }

  async findAll(): Promise<TipoReceta[]> {
    return this.tipoRecetaRepository.find({
      order: { id: 'ASC' },
      relations: ['medicamentos'],
    });
  }

  async findOne(id: number): Promise<TipoReceta> {
    const tipo = await this.tipoRecetaRepository.findOne({
      where: { id },
      relations: ['medicamentos'],
    });

    if (!tipo) {
      throw new NotFoundException(`Tipo de receta con id ${id} no encontrado`);
    }

    return tipo;
  }

  async update(
    id: number,
    updateTipoRecetaDto: UpdateTipoRecetaDto,
  ): Promise<TipoReceta> {
    const tipo = await this.findOne(id);
    
    if (updateTipoRecetaDto.nombre) {
      const existe = await this.tipoRecetaRepository.findOne({
        where: { nombre: updateTipoRecetaDto.nombre.trim() },
      });
      if (existe && existe.id !== id) {
        throw new ConflictException('Ya existe otro tipo de receta con ese nombre');
      }
    }

    Object.assign(tipo, {
      ...updateTipoRecetaDto,
      nombre: updateTipoRecetaDto.nombre ? updateTipoRecetaDto.nombre.trim() : tipo.nombre,
    });

    return this.tipoRecetaRepository.save(tipo);
  }

  async remove(id: number): Promise<TipoReceta> {
    const tipo = await this.findOne(id);
    return this.tipoRecetaRepository.softRemove(tipo);
  }
}
