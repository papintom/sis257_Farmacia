import type { Categoria } from './categoria'
export interface Medicamento {
  id: number
  idCategoria: number
  nombre: string
  descripcion: string
  concentracion: string
  forma: string
  precio: number
  fotografia: string
  categoria: Categoria
}
