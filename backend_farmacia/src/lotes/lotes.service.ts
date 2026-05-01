import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { Lote } from './entities/lote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LotesService {
  constructor(@InjectRepository(Lote) private loteRepository: Repository<Lote>,
  ) {}
  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
  let lote = await this.loteRepository.findOne({
    where: { fechaVencimiento: createLoteDto.fechaVencimiento },
  });

  if (lote) throw new ConflictException('El lote ya existe');

  lote = new Lote();

  lote.idMedicamento = createLoteDto.idMedicamento;
  lote.idProveedor = createLoteDto.idProveedor;
  lote.stock = createLoteDto.stock;
  lote.fechaVencimiento = createLoteDto.fechaVencimiento;

  lote.medicamento = { id: createLoteDto.idMedicamento } as any;
  lote.proveedor = { id: createLoteDto.idProveedor } as any;

  return this.loteRepository.save(lote);
}
  async findAll():Promise<Lote[]> {
     return this.loteRepository.find({
      order: { id: 'ASC' },
      relations: ['medicamento'], 
    });
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.loteRepository.findOne({
      where: { id },
      relations: ['medicamento'],
    });

    if (!lote) {
      throw new NotFoundException(`Lote con id ${id} no encontrado`);
    }

    return lote;
  }

  async update(id: number, updateLoteDto: UpdateLoteDto): Promise<Lote> {
    const lote = await this.findOne(id);
    Object.assign(lote, updateLoteDto);
    return this.loteRepository.save(lote);
  }

  async remove(id: number): Promise<Lote> {
    const lote = await this.findOne(id);
    return this.loteRepository.softRemove(lote);
  }
    
}
