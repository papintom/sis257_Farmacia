<script setup lang="ts">
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
  <div class="min-h-screen bg-gray-100 p-5">

    <!-- TITULO -->

    <div class="mb-5">
      <h1 class="text-3xl font-bold">
        Nueva Venta
      </h1>
    </div>

    <!-- DATOS -->

    <Card class="mb-4">

      <template #title>
        Datos de la Venta
      </template>

      <template #content>

        <div class="grid grid-cols-4 gap-4">

          <!-- CI -->

          <div>
            <label class="font-semibold block mb-2">
              CI Cliente
            </label>

            <div class="flex gap-2">

              <InputText v-model="ciCliente" placeholder="Buscar CI" class="w-full" />

              <Button icon="pi pi-search" @click="buscarCliente" />

            </div>

          </div>

          <!-- CLIENTE -->

          <div>
            <label class="font-semibold block mb-2">
              Cliente
            </label>

            <InputText :value="cliente?.nombre" disabled class="w-full" />

          </div>

          <!-- METODO -->

          <div>
            <label class="font-semibold block mb-2">
              Método Pago
            </label>

            <Select v-model="metodoPago" :options="metodosPago" class="w-full" />

          </div>

          <!-- OBS -->

          <div>
            <label class="font-semibold block mb-2">
              Observación
            </label>

            <InputText v-model="observacion" class="w-full" />

          </div>

        </div>

      </template>

    </Card>

    <!-- CONTENIDO -->

    <div class="grid grid-cols-2 gap-4">

      <!-- PRODUCTOS -->

      <Card>

        <template #title>
          Agregar Productos
        </template>

        <template #content>

          <!-- BUSCADOR -->

          <div class="mb-4">

            <InputText v-model="busquedaMedicamento
              " placeholder="Buscar medicamento..." class="w-full" />

          </div>

          <!-- TABLA -->

          <DataTable :value="lotesFiltrados" paginator :rows="5" tableStyle="min-width: 50rem">

            <Column field="medicamento.nombre" header="Medicamento" />

            <Column field="id" header="Lote" />

            <Column field="fechaVencimiento" header="Vencimiento" />

            <Column field="stock" header="Stock" />

            <Column header="Precio">

              <template #body="{ data }">
                Bs.
                {{
                  data.medicamento
                    .precio
                }}
              </template>

            </Column>

            <Column header="Acción">

              <template #body="{ data }">

                <Button label="Agregar" icon="pi pi-plus" size="small" @click="
                  agregarProducto(
                    data,
                  )
                  " />

              </template>

            </Column>

          </DataTable>

        </template>

      </Card>

      <!-- DETALLE -->

      <Card>

        <template #title>
          Detalle Venta
        </template>

        <template #content>

          <DataTable :value="detalleVenta" paginator :rows="5">

            <Column field="medicamento" header="Medicamento" />

            <Column field="lote" header="Lote" />

            <Column header="Precio">

              <template #body="{ data }">
                Bs.
                {{
                  data.precioUnitario
                }}
              </template>

            </Column>

            <!-- CANTIDAD -->

            <Column field="cantidad" header="Cantidad">

              <template #body="{ data }">

                <div class="flex items-center gap-2">

                  <Button icon="pi pi-minus" severity="secondary" size="small" @click="
                    disminuirCantidad(
                      data,
                    )
                    " />

                  <span>
                    {{ data.cantidad }}
                  </span>

                  <Button icon="pi pi-plus" severity="secondary" size="small" @click="
                    aumentarCantidad(
                      data,
                    )
                    " />

                </div>

              </template>

            </Column>

            <!-- SUBTOTAL -->

            <Column header="Subtotal">

              <template #body="{ data }">
                Bs.
                {{ data.subtotal }}
              </template>

            </Column>

            <!-- ELIMINAR -->

            <Column header="Eliminar">

              <template #body="{ data }">

                <Button icon="pi pi-trash" severity="danger" text @click="
                  eliminarProducto(
                    data.id,
                  )
                  " />

              </template>

            </Column>

          </DataTable>

          <Divider />

          <!-- TOTALES -->

          <div class="space-y-4">

            <div class="flex justify-between">

              <span>Total</span>

              <span class="font-bold">
                Bs. {{ total }}
              </span>

            </div>

            <div class="flex justify-between items-center">

              <span>Descuento</span>

              <InputNumber v-model="descuento" mode="decimal" :minFractionDigits="2" />

            </div>

            <Divider />

            <div class="flex justify-between">

              <span class="text-2xl font-bold">
                TOTAL:
              </span>

              <span class="text-3xl font-bold text-green-600">
                Bs.
                {{ totalFinal }}
              </span>

            </div>

          </div>

          <!-- BOTONES -->

          <div class="flex gap-2 mt-5">

            <Button label="Limpiar" severity="secondary" class="w-full" @click="limpiarVenta" />

            <Button label="Guardar Venta" icon="pi pi-save" class="w-full" @click="guardarVenta" />

          </div>

        </template>

      </Card>

    </div>

  </div>
</template>

<style scoped></style>