import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLaboratorioDto } from './dto/create-laboratorio.dto';
import { UpdateLaboratorioDto } from './dto/update-laboratorio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratorio } from './entities/laboratorio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LaboratoriosService {
  constructor(
    @InjectRepository(Laboratorio)
    private readonly laboratorioRepository: Repository<Laboratorio>,
  ) {}

  async create(createLaboratorioDto: CreateLaboratorioDto): Promise<Laboratorio> {
    const existe = await this.laboratorioRepository.findOne({
      where: { nombre: createLaboratorioDto.nombre.trim() },
    });

    if (existe) {
      throw new ConflictException('El laboratorio ya existe');
    }

    const nuevo = this.laboratorioRepository.create({
      ...createLaboratorioDto,
      nombre: createLaboratorioDto.nombre.trim(),
    });

    return this.laboratorioRepository.save(nuevo);
  }

  async findAll(): Promise<Laboratorio[]> {
    return this.laboratorioRepository.find({
      order: { id: 'ASC' },
      relations: ['medicamentos'],
    });
  }

  async findOne(id: number): Promise<Laboratorio> {
    const laboratorio = await this.laboratorioRepository.findOne({
      where: { id },
      relations: ['medicamentos'],
    });

    if (!laboratorio) {
      throw new NotFoundException(`Laboratorio con id ${id} no encontrado`);
    }

    return laboratorio;
  }

  async update(
    id: number,
    updateLaboratorioDto: UpdateLaboratorioDto,
  ): Promise<Laboratorio> {
    const laboratorio = await this.findOne(id);

    if (updateLaboratorioDto.nombre) {
      const existe = await this.laboratorioRepository.findOne({
        where: { nombre: updateLaboratorioDto.nombre.trim() },
      });
      if (existe && existe.id !== id) {
        throw new ConflictException('Ya existe otro laboratorio con ese nombre');
      }
    }

    Object.assign(laboratorio, {
      ...updateLaboratorioDto,
      nombre: updateLaboratorioDto.nombre ? updateLaboratorioDto.nombre.trim() : laboratorio.nombre,
    });

    return this.laboratorioRepository.save(laboratorio);
  }

  async remove(id: number): Promise<Laboratorio> {
    const laboratorio = await this.findOne(id);
    return this.laboratorioRepository.softRemove(laboratorio);
  }
}
