import type { Lote } from './lote'
import type { Venta } from './venta'

export interface DetalleVenta {
  id: number

  idVenta: number
  idLote: number

  cantidad: number
  precioUnitario: number
  subtotal: number
  venta: Venta

  lote: Lote
}
