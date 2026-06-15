import { Lote } from 'src/lotes/entities/lote.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('detalle_venta')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_Venta', type: 'int' })
  idVenta: number;

  @Column({ name: 'id_Lote', type: 'int' })
  idLote: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'id_Venta', referencedColumnName: 'id' })
  venta: Venta;

  @ManyToOne(() => Lote)
  @JoinColumn({ name: 'id_Lote', referencedColumnName: 'id' })
  lote: Lote;
}
