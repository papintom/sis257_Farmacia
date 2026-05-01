import { DetalleVenta } from 'src/detalle-ventas/entities/detalleventa.entity';
import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('lote')
export class Lote {
  @PrimaryGeneratedColumn('identity')
  id: number;
  @Column('integer', { name: 'id_medicamento' })
  idMedicamento: number;
  @Column('integer', { name: 'id_proveedor' })
  idProveedor: number;
  @Column('integer', { name: 'stock' })
  stock: number;
  @Column('date', { name: 'fecha_vencimiento' })
  fechaVencimiento: Date;
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.lotes)
  @JoinColumn({ name: 'id_medicamento', referencedColumnName: 'id' })
  medicamento: Medicamento;
  
  @ManyToOne(() => Proveedor, (proveedor) => proveedor.lotes)
  @JoinColumn({ name: 'id_proveedor', referencedColumnName: 'id' })
  proveedor: Proveedor;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.lote)
  detallesVenta: DetalleVenta[];

}
