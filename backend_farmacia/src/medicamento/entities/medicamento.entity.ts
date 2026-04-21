import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicamento')
export class Medicamento {

  @PrimaryGeneratedColumn()
  id_medicamento: number;

  @Column({ type: 'varchar', length: 30 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @Column({ type: 'int', nullable: true })
  id_categoria: number;

  @Column({ type: 'int', nullable: true })
  id_proveedor: number;
}