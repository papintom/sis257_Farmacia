<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import http from '@/plugins/axios'

import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Divider from 'primevue/divider'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

import { computed, onMounted, ref } from 'vue'

/* =========================================
   CLIENTES
========================================= */

const ciCliente = ref('')
const cliente = ref<any>(null)

async function buscarCliente() {
  try {
    const response = await http.get(
      `clientes/ci/${ciCliente.value}`,
    )

    cliente.value = response.data
  } catch (error) {
    cliente.value = null
    alert('Cliente no encontrado')
  }
}

/* =========================================
   METODO PAGO
========================================= */

const metodoPago = ref('Efectivo')

const metodosPago = [
  'Efectivo',
  'QR',
  'Tarjeta',
]

const observacion = ref('')

/* =========================================
   LOTES / MEDICAMENTOS
========================================= */

const lotes = ref<any[]>([])

async function obtenerLotes() {
  lotes.value = await http
    .get('lotes')
    .then((response) => response.data)
}

const busquedaMedicamento = ref('')

const lotesFiltrados = computed(() => {
  return lotes.value.filter(
    (lote) =>
      lote.medicamento.nombre
        .toLowerCase()
        .includes(
          busquedaMedicamento.value.toLowerCase(),
        ) ||
      lote.id
        .toString()
        .includes(busquedaMedicamento.value),
  )
})

/* =========================================
   DETALLE VENTA
========================================= */

const detalleVenta = ref<any[]>([])

function agregarProducto(lote: any) {
  const existe = detalleVenta.value.find(
    (item) => item.id === lote.id,
  )

  if (existe) {
    if (existe.cantidad < lote.stock) {
      existe.cantidad++

      existe.subtotal =
        existe.cantidad *
        existe.precioUnitario
    }
  } else {
    detalleVenta.value.push({
      id: lote.id,
      medicamento:
        lote.medicamento.nombre,
      lote: lote.id,
      precioUnitario:
        lote.medicamento.precio,
      cantidad: 1,
      subtotal:
        lote.medicamento.precio,
      stock: lote.stock,
    })
  }
}

function aumentarCantidad(item: any) {
  if (item.cantidad < item.stock) {
    item.cantidad++

    item.subtotal =
      item.cantidad *
      item.precioUnitario
  }
}

function disminuirCantidad(item: any) {
  if (item.cantidad > 1) {
    item.cantidad--

    item.subtotal =
      item.cantidad *
      item.precioUnitario
  }
}

function eliminarProducto(id: number) {
  detalleVenta.value =
    detalleVenta.value.filter(
      (item) => item.id !== id,
    )
}

/* =========================================
   TOTALES
========================================= */

const descuento = ref(0)

const total = computed(() => {
  return detalleVenta.value.reduce(
    (acc, item) => acc + item.subtotal,
    0,
  )
})

const totalFinal = computed(() => {
  return total.value - descuento.value
})

/* =========================================
   GUARDAR VENTA
========================================= */

async function guardarVenta() {
  try {
    if (!cliente.value) {
      alert('Seleccione un cliente')
      return
    }

    if (detalleVenta.value.length === 0) {
      alert('Agregue productos')
      return
    }

    const body = {
      fecha: new Date(),
      total: totalFinal.value,
      idCliente: cliente.value.id,

      detalle: detalleVenta.value.map(
        (item) => ({
          idLote: item.id,
          cantidad: item.cantidad,
          precioUnitario:
            item.precioUnitario,
          subtotal: item.subtotal,
        }),
      ),
    }

    console.log(body)

    await http.post('ventas', body)

    alert('Venta guardada')

    limpiarVenta()
  } catch (error: any) {
    alert(
      error?.response?.data?.message,
    )
  }
}

/* =========================================
   LIMPIAR
========================================= */

function limpiarVenta() {
  ciCliente.value = ''
  cliente.value = null
  detalleVenta.value = []
  descuento.value = 0
  observacion.value = ''
}

/* =========================================
   INIT
========================================= */

onMounted(() => {
  obtenerLotes()
})
</script>

<template>
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-tag" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Gestión</p>
          <h1 class="h3 mb-1">Categorías</h1>
          <p class="text-muted mb-0">Administra las categorías de medicamentos y productos disponibles.</p>
        </div>
      </div>
    </div>

    <section class="panel mt-3">
      <div class="panel-header">
        <h2 class="h5 mb-0 section-title">
          <i class="bi bi-list-ul" aria-hidden="true"></i>
          <span>Listado de Categorías</span>
        </h2>
      </div>

      <div style="padding: 1.5rem; text-align: center; color: var(--admin-muted);">
        <p style="margin: 0;">Sistema de categorías en desarrollo</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem;">Próximamente disponible</p>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.eyebrow {
  color: var(--admin-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.mt-3 {
  margin-top: 1rem;
}
</style>

