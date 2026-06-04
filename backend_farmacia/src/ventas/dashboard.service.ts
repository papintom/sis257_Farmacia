import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../ventas/entities/venta.entity';
import { Medicamento } from '../medicamentos/entities/medicamento.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
// Asumiendo que existe la entidad Cliente en esta ruta
import { Cliente } from '../clientes/entities/cliente.entity'; 

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Venta) private ventaRepo: Repository<Venta>,
    @InjectRepository(Medicamento) private medicamentoRepo: Repository<Medicamento>,
    @InjectRepository(Proveedor) private proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
  ) {}

  async getTotals() {
    const [totalMedicamentos, totalVentas, totalClientes, totalProveedores] = await Promise.all([
      this.medicamentoRepo.count(),
      this.ventaRepo.count(),
      this.clienteRepo.count(),
      this.proveedorRepo.count(),
    ]);

    return {
      totalMedicamentos,
      totalVentas,
      totalClientes,
      totalProveedores,
    };
  }
}