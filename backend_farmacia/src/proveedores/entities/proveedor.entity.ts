import { Lote } from "src/lotes/entities/lote.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('proveedor')
export class Proveedor{
@PrimaryGeneratedColumn('identity')
id; number;
@Column('varchar', { name: 'nombre' })
nombre: string;
@Column('varchar', { name: 'telefono' })
telefono: string;
@Column('varchar', { name: 'direccion' })
direccion: string;
@CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
  @OneToMany(() => Lote, (lote) => lote.proveedor)
  lotes: Lote[];

}
