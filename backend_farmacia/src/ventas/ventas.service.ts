import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from 'src/detalle-ventas/entities/detalleventa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lote } from 'src/lotes/entities/lote.entity';

@Injectable()
export class VentaService {
 constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {

  const venta = new Venta();
  Object.assign(venta, createVentaDto);

 
  venta.usuario = { id: createVentaDto.idUsuario } as any;
  venta.cliente = { id: createVentaDto.idCliente } as any;

  return this.ventaRepository.save(venta);
}

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({
      relations: ['usuario', 'cliente'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['usuario', 'cliente'],
    });

    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    Object.assign(venta, updateVentaDto);
    return this.ventaRepository.save(venta);
  }

  async remove(id: number): Promise<Venta> {
    const venta = await this.findOne(id);
    return this.ventaRepository.softRemove(venta);
  }
}
