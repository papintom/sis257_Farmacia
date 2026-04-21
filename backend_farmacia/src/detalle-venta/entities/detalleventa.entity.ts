import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detalle_venta')
export class DetalleVenta {

  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column({ type: 'int' })
  id_venta: number;

  @Column({ type: 'int' })
  id_medicamento: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}