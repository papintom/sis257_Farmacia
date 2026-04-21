import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venta')
export class Venta {

  @PrimaryGeneratedColumn()
  id_venta: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'int' })
  id_usuario: number;

  @Column({ type: 'int' })
  id_cliente: number;
}
