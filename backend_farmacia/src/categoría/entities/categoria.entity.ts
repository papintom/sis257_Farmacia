import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoria')
export class Categoria {

  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
