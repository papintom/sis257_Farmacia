import { on } from 'events';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  rol: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }
}
