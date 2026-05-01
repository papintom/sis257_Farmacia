import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  let medicamento = await this.medicamentoRepository.findOneBy({
    nombre: createMedicamentoDto.nombre.trim(),
    concentracion: createMedicamentoDto.concentracion,
    forma: createMedicamentoDto.forma,
  });

  if (medicamento) {
    throw new ConflictException('El medicamento ya existe');
  }

  medicamento = new Medicamento();
  Object.assign(medicamento, createMedicamentoDto);

 
  medicamento.categoria = { id: createMedicamentoDto.idCategoria } as any;

  return this.medicamentoRepository.save(medicamento);
}

  async findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find({
      order: { id: 'ASC' },
      relations: ['categoria'],
    });
  }

  async findOne(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento con id ${id} no encontrado`);
    }

    return medicamento;
  }

  async update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    Object.assign(medicamento, updateMedicamentoDto);
    return this.medicamentoRepository.save(medicamento);
  }

  async remove(id: number): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    return this.medicamentoRepository.softRemove(medicamento);
  }
}
