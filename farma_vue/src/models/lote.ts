import type { Medicamento } from './medicamento'
import type { Proveedor } from './proveedor'
export interface Lote {
  id: number
  idMedicamento: number
  idProveedor: number
  stock: number
  fechaVencimiento: Date
  medicamento: Medicamento
  proveedor: Proveedor
}
