import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create.detalleventa.dto';
import { UpdateDetalleVentaDto } from './dto/update.detalleventa.dto';
import { DetalleVenta } from './entities/detalleventa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from 'src/lotes/entities/lote.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private detalleRepository: Repository<DetalleVenta>,
    @InjectRepository(Lote)
    private loteRepository: Repository<Lote>,
  ) {}
  async create(
    createDetalleVentaDto: CreateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalle = new DetalleVenta();

    Object.assign(detalle, createDetalleVentaDto);

    detalle.venta = {
      id: createDetalleVentaDto.idVenta,
    } as any;

    detalle.lote = {
      id: createDetalleVentaDto.idLote,
    } as any;

    const detalleGuardado = await this.detalleRepository.save(detalle);

    // DESCONTAR STOCK
    const lote = await this.loteRepository.findOneBy({
      id: createDetalleVentaDto.idLote,
    });

    if (lote) {
      lote.stock = lote.stock - createDetalleVentaDto.cantidad;

      await this.loteRepository.save(lote);
    }

    return detalleGuardado;
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detalleRepository.find({
      relations: ['venta', 'lote', 'lote.medicamento'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<DetalleVenta> {
    const detalle = await this.detalleRepository.findOne({
      where: { id },
      relations: ['venta', 'lote'],
    });

    if (!detalle) {
      throw new NotFoundException('Detalle no encontrado');
    }

    return detalle;
  }

  async update(
    id: number,
    updateDetalleVentaDto: UpdateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, updateDetalleVentaDto);
    return this.detalleRepository.save(detalle);
  }

  async remove(id: number): Promise<DetalleVenta> {
    const detalle = await this.findOne(id);
    return this.detalleRepository.softRemove(detalle);
  }
  async findByVenta(idVenta: number) {
    return this.detalleRepository.find({
      where: {
        idVenta,
      },

      relations: ['lote', 'lote.medicamento'],
    });
  }
}
