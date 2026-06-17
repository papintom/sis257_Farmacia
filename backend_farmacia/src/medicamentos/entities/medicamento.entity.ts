import { Categoria } from 'src/categorias/entities/categoria.entity';
import { FormasFarmaceutica } from 'src/formas-farmaceuticas/entities/formas-farmaceutica.entity';
import { Lote } from 'src/lotes/entities/lote.entity';
import { Laboratorio } from 'src/laboratorios/entities/laboratorio.entity';
import { TipoReceta } from 'src/tipo-recetas/entities/tipo-receta.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('medicamento')
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;
    @Column({ name: 'id_categoria', type: 'int' })
  idCategoria: number;

  @Column({ name: 'id_forma_farmaceutica', type: 'int' })
  idFormaFarmaceutica: number;

  @Column({ name: 'id_laboratorio', type: 'int', nullable: true })
  idLaboratorio: number;

  @Column({ name: 'id_tipo_receta', type: 'int', nullable: true })
  idTipoReceta: number;

  @Column({ type: 'varchar', length: 80 })
  nombre: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 50 })
  concentracion: string;

  @Column({ type: 'boolean', default: false })
  receta: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column('varchar', { length: 2000, nullable: true })
  fotografia: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Lote, (lote) => lote.medicamento)
  lotes: Lote[];

  @ManyToOne(() => Categoria, (categoria) => categoria.medicamento)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(() => FormasFarmaceutica, (forma) => forma.medicamento)
  @JoinColumn({ name: 'id_forma_farmaceutica', referencedColumnName: 'id' })
  formaFarmaceutica: FormasFarmaceutica;

  @ManyToOne(() => Laboratorio, (laboratorio) => laboratorio.medicamentos)
  @JoinColumn({ name: 'id_laboratorio', referencedColumnName: 'id' })
  laboratorio: Laboratorio;

  @ManyToOne(() => TipoReceta, (tipoReceta) => tipoReceta.medicamentos)
  @JoinColumn({ name: 'id_tipo_receta', referencedColumnName: 'id' })
  tipoReceta: TipoReceta;
}
