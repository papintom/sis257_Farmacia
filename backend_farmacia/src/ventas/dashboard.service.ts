import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../ventas/entities/venta.entity';
import { Medicamento } from '../medicamentos/entities/medicamento.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
// Asumiendo que existe la entidad Cliente en esta ruta
import { Cliente } from '../clientes/entities/cliente.entity'; 
import { Lote } from 'src/lotes/entities/lote.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Venta) private ventaRepo: Repository<Venta>,
    @InjectRepository(Medicamento) private medicamentoRepo: Repository<Medicamento>,
    @InjectRepository(Proveedor) private proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
     @InjectRepository(Lote)private loteRepository: Repository<Lote>,

  ) {}

  async getTotals() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const totalMedicamentos = await this.medicamentoRepo.count();

  const totalProveedores = await this.proveedorRepo.count();

  // Ventas realizadas hoy
  const totalVentas = await this.ventaRepo
    .createQueryBuilder('venta')
    .where('venta.fecha >= :hoy', { hoy })
    .andWhere('venta.fecha < :manana', { manana })
    .getCount();

  // Clientes únicos que compraron hoy
  const clientesHoy = await this.ventaRepo
    .createQueryBuilder('venta')
    .select('DISTINCT venta.idCliente')
    .where('venta.fecha >= :hoy', { hoy })
    .andWhere('venta.fecha < :manana', { manana })
    .getRawMany();

  return {
    totalMedicamentos,
    totalVentas,
    totalClientes: clientesHoy.length,
    totalProveedores,
  };
}
async stockBajo() {
  return this.loteRepository
    .createQueryBuilder('l')
    .leftJoinAndSelect('l.medicamento', 'm')
    .where('l.stock <= :stock', { stock: 10 })
    .getMany();
}

async proximosVencer() {
  const hoy = new Date();

  const treintaDias = new Date();
  treintaDias.setDate(hoy.getDate() + 30);

  return this.loteRepository
    .createQueryBuilder('l')
    .leftJoinAndSelect('l.medicamento', 'm')
    .where('l.fechaVencimiento >= :hoy', { hoy })
    .andWhere('l.fechaVencimiento <= :treintaDias', {
      treintaDias,
    })
    .orderBy('l.fechaVencimiento', 'ASC')
    .getMany();
}
async lotesVencidos() {
  const hoy = new Date();

  return this.loteRepository
    .createQueryBuilder('l')
    .leftJoinAndSelect('l.medicamento', 'm')
    .where('l.fechaVencimiento < :hoy', { hoy })
    .orderBy('l.fechaVencimiento', 'ASC')
    .getMany();
}
  }
