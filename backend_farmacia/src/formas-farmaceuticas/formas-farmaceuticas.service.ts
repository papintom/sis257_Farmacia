import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFormasFarmaceuticaDto } from './dto/create-formas-farmaceutica.dto';
import { UpdateFormasFarmaceuticaDto } from './dto/update-formas-farmaceutica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormasFarmaceutica } from './entities/formas-farmaceutica.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class FormasFarmaceuticasService {
  constructor(
    @InjectRepository(FormasFarmaceutica)
    private formasFarmaceuticasRepository: Repository<FormasFarmaceutica>,
  ) {}

  async create(
    createFormasFarmaceuticaDto: CreateFormasFarmaceuticaDto,
  ): Promise<FormasFarmaceutica> {
    const existe = await this.formasFarmaceuticasRepository.findOne({
      where: { nombre: createFormasFarmaceuticaDto.nombre },
    });

    if (existe) {
      throw new ConflictException('La forma farmacéutica ya existe');
    }

    const nueva = this.formasFarmaceuticasRepository.create(
      createFormasFarmaceuticaDto,
    );

    return this.formasFarmaceuticasRepository.save(nueva);
  }

  async findAll(): Promise<FormasFarmaceutica[]> {
    return this.formasFarmaceuticasRepository.find({
      order: { id: 'ASC' },
      relations: ['medicamento'], 
    });
  }

  // NUEVO: búsqueda por nombre
  async findByName(nombre: string): Promise<FormasFarmaceutica[]> {
    return this.formasFarmaceuticasRepository.find({
      where: {
        nombre: ILike(`%${nombre}%`),
      },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<FormasFarmaceutica> {
    const forma = await this.formasFarmaceuticasRepository.findOne({
      where: { id },
    });

    if (!forma) {
      throw new NotFoundException(
        `FormaFarmaceutica con id ${id} no encontrada`,
      );
    }

    return forma;
  }

  async update(
    id: number,
    updateDto: UpdateFormasFarmaceuticaDto,
  ): Promise<FormasFarmaceutica> {
    const forma = await this.findOne(id);

    Object.assign(forma, updateDto);

    return this.formasFarmaceuticasRepository.save(forma);
  }

  async remove(id: number): Promise<FormasFarmaceutica> {
    const forma = await this.findOne(id);

    return this.formasFarmaceuticasRepository.softRemove(forma);
  }
}