import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Lote } from 'src/lotes/entities/lote.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('medicamento')
export class Medicamento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  nombre: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 50 })
  concentracion: string;

  @Column({ type: 'varchar', length: 20 })
  forma: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Lote, (lote) => lote.medicamento)
  lotes: Lote[];

  @ManyToOne(() => Categoria, (categoria) => categoria.id)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;
  

}