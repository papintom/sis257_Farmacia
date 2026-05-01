import { Lote } from 'src/lotes/entities/lote.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('detalle_venta')
export class DetalleVenta {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  idVenta: number;

  @Column({ type: 'int' })
  idLote: number;


  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
  
  @ManyToOne(() => Venta, venta => venta.detalles)
  @JoinColumn({ name: 'id_Venta', referencedColumnName: 'id' })
  venta: Venta;

@ManyToOne(() => Lote)
@JoinColumn({ name: 'id_Lote', referencedColumnName: 'id' })
lote: Lote;
}