import type { Cliente } from './cliente'
import type { Usuario } from './usuario'
import type { DetalleVenta } from './detalleVenta'

export interface Venta {
  id: number

  metodoPago: string
  fecha: Date
  total: number

  idCliente: number
  idUsuario: number

  cliente: Cliente
  usuario: Usuario

  detalles: DetalleVenta[]
}
