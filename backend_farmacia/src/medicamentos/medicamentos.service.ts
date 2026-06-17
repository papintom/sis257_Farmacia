import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamento } from './entities/medicamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private medicamentoRepository: Repository<Medicamento>,
  ) {}

  async create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
  const existe = await this.medicamentoRepository.findOne({
    where: {
      nombre: createMedicamentoDto.nombre.trim(),
      concentracion: createMedicamentoDto.concentracion,
    },
  });

  if (existe) {
    throw new ConflictException('El medicamento ya existe');
  }

  const medicamento = this.medicamentoRepository.create(createMedicamentoDto);

  medicamento.categoria = { id: createMedicamentoDto.idCategoria } as any;
  medicamento.formaFarmaceutica = { id: createMedicamentoDto.idFormaFarmaceutica } as any;

  if (createMedicamentoDto.idLaboratorio) {
    medicamento.laboratorio = { id: createMedicamentoDto.idLaboratorio } as any;
  }
  if (createMedicamentoDto.idTipoReceta) {
    medicamento.tipoReceta = { id: createMedicamentoDto.idTipoReceta } as any;
  }

  return this.medicamentoRepository.save(medicamento);
}

  async findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find({
      order: { id: 'ASC' },
      relations: ['categoria', 'formaFarmaceutica', 'laboratorio', 'tipoReceta'],
    });
  }

  async findOne(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
      relations: ['categoria', 'formaFarmaceutica', 'laboratorio', 'tipoReceta'],
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento con id ${id} no encontrado`);
    }

    return medicamento;
  }

  async update(
    id: number,
    updateMedicamentoDto: UpdateMedicamentoDto,
  ): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    Object.assign(medicamento, updateMedicamentoDto);

    if (updateMedicamentoDto.idLaboratorio !== undefined) {
      medicamento.laboratorio = updateMedicamentoDto.idLaboratorio
        ? ({ id: updateMedicamentoDto.idLaboratorio } as any)
        : null;
    }
    if (updateMedicamentoDto.idTipoReceta !== undefined) {
      medicamento.tipoReceta = updateMedicamentoDto.idTipoReceta
        ? ({ id: updateMedicamentoDto.idTipoReceta } as any)
        : null;
    }

    return this.medicamentoRepository.save(medicamento);
  }

  async remove(id: number): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    return this.medicamentoRepository.softRemove(medicamento);
  }
}
