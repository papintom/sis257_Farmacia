import type { Categoria } from './categoria'
import type { FormaFarmaceutica } from './formaFarmaceutica'
import type { Laboratorio } from './laboratorio'

export interface Medicamento {
  id: number
  idCategoria: number
  idFormaFarmaceutica: number
  idLaboratorio?: number
  nombre: string
  descripcion: string
  concentracion: string
  receta: boolean
  precio: number
  fotografia: string
  categoria: Categoria
  formaFarmaceutica?: FormaFarmaceutica
  laboratorio?: Laboratorio
}
