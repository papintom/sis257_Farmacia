import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(@InjectRepository(Proveedor) private proveedorRepository: Repository<Proveedor>) {}
  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    let proveedor = await this.proveedorRepository.findOneBy({
      nombre: createProveedorDto.nombre.trim(),
    });

    if (proveedor) {
      throw new ConflictException('El proveedor ya existe');
    }

    proveedor = new Proveedor();
    Object.assign(proveedor, createProveedorDto);

    return this.proveedorRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      order: { id: 'ASC' },
      relations: ['lotes'], 
    });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id },
      relations: ['lotes'],
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    }

    return proveedor;
  }
  

  async update(id: number, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.findOne(id);
    Object.assign(proveedor, updateProveedorDto);
    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: number): Promise<Proveedor> {
    const proveedor = await this.findOne(id);
    return this.proveedorRepository.remove(proveedor);
  }
}
