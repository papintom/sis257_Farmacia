import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useVentaStore = defineStore('venta', () => {
  const detalleVenta = ref<any[]>([])

  function agregarProducto(lote: any) {
    const existe = detalleVenta.value.find((item) => item.idLote === lote.id)

    if (existe) {
      existe.cantidad++

      existe.subtotal = existe.cantidad * existe.precio
    } else {
      detalleVenta.value.push({
        idLote: lote.id,
        medicamento: lote.medicamento.nombre,
        precio: lote.medicamento.precio,
        cantidad: 1,
        subtotal: lote.medicamento.precio,
      })
    }
  }

  function eliminarProducto(index: number) {
    detalleVenta.value.splice(index, 1)
  }

  const total = computed(() => {
    return detalleVenta.value.reduce((acc, item) => acc + item.subtotal, 0)
  })

  return {
    detalleVenta,
    agregarProducto,
    eliminarProducto,
    total,
  }
})
