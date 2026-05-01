import { join } from 'path';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetalleVenta } from 'src/detalle-ventas/entities/detalleventa.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('venta')
export class Venta {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

 @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
  

  @ManyToOne(( ) => Cliente, cliente => cliente.ventas)
  @JoinColumn({ name: 'id_cliente',referencedColumnName: 'id' })
  cliente: Cliente;
  @ManyToOne(() => Usuario, usuario => usuario.ventas)
  @JoinColumn ({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;
  @OneToMany(() => DetalleVenta, detalleVenta => detalleVenta.venta)
  detalles: DetalleVenta[];


}
