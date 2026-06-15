import type { Categoria } from './categoria'
import type { FormaFarmaceutica } from './formaFarmaceutica'
export interface Medicamento {
  id: number
  idCategoria: number
  idFormaFarmaceutica: number
  nombre: string
  descripcion: string
  concentracion: string
  receta: boolean
  precio: number
  fotografia: string
  categoria: Categoria
  forma: FormaFarmaceutica
}
