<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'

import VentaProductos from '@/components/venta/VentaProductos.vue'
import VentaDetalle from '@/components/venta/VentaDetalle.vue'

import Select from 'primevue/select'
import Button from 'primevue/button'
import ClienteSave from '@/components/cliente/ClienteSave.vue'

/* =========================
   CLIENTES
========================= */

import InputText from 'primevue/inputtext'
import router from '@/router'

const ciCliente = ref('')
const cliente = ref<any>(null)
const idCliente = ref(0)
const mostrarClienteDialog = ref(false)

function agregarCliente() {
    mostrarClienteDialog.value = true
}

async function buscarCliente() {

    try {

        const response = await http.get(
            `clientes/ci/${ciCliente.value}`
        )

        cliente.value = response.data

        idCliente.value = cliente.value.id

    } catch (error) {

        cliente.value = null
        idCliente.value = 0

        alert('Cliente no encontrado')

    }

}
async function obtenerClientes() {

    cliente.value = await http
        .get('clientes')
        .then((res) => res.data)

}

/* =========================
   METODO PAGO
========================= */

const metodoPago = ref('')

const metodosPago = [
    'Efectivo',
    'QR',
    'Transferencia',
]


/* =========================
   DETALLE VENTA
========================= */

const detalleVenta = ref<any[]>([])

function agregarProducto(lote: any) {

    console.log('LOTE:', lote)

    const existe = detalleVenta.value.find(
        (item) => item.idLote === lote.id
    )

    if (existe) {

        existe.cantidad++

        existe.subtotal =
            existe.cantidad * existe.precio

    } else {

        detalleVenta.value.push({
            idLote: lote.id,
            medicamento: lote.medicamento.nombre,
            precio: Number(lote.medicamento.precio),
            cantidad: 1,
            subtotal: Number(lote.medicamento.precio),
        })

    }

    console.log('DETALLE:', detalleVenta.value)
}

function eliminarProducto(index: number) {

    detalleVenta.value.splice(index, 1)

}

/* =========================
   TOTAL
========================= */

const total = computed(() => {
    return detalleVenta.value.reduce(
        (acc, item) => acc + Number(item.subtotal),
        0
    )
})

/* =========================
   GUARDAR
========================= */

async function guardarVenta() {

    try {

        const bodyVenta = {

            idCliente: idCliente.value,

            idUsuario: 2,

            metodoPago: metodoPago.value,

            fecha: new Date(),

            total: total.value,

        }

        // guardar venta
        const response =
            await http.post('ventas', bodyVenta)

        const venta = response.data

        // guardar detalles
        for (const item of detalleVenta.value) {

            const bodyDetalle = {

                idVenta: venta.id,

                idLote: item.idLote,

                cantidad: item.cantidad,

                precioUnitario: item.precio,

                subtotal: item.subtotal,


            }

            await http.post(
                'detalle-ventas',
                bodyDetalle
            )

        }
        router.push(`/factura/${venta.id}`)

        alert('Venta registrada')

    } catch (error: any) {

        alert(error?.response?.data?.message)

    }

}

onMounted(() => {

    obtenerClientes()

})
</script>

<template>
    <AdminLayout>
        <div class="page-heading">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-cart-check" aria-hidden="true"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Operaciones</p>
                    <h1 class="h3 mb-1">Nueva Venta</h1>
                    <p class="text-muted mb-0">Registra nuevas ventas y detalles de compra.</p>
                </div>
            </div>
        </div>

        <!-- CABECERA -->
        <section class="panel mt-3">
            <div class="panel-header">
                <h2 class="h5 mb-0 section-title">
                    <i class="bi bi-info-circle" aria-hidden="true"></i>
                    <span>Información del Cliente</span>
                </h2>
            </div>

            <div style="padding: 1.5rem;">
                <div class="grid">
                    <!-- CLIENTE -->
                    <div class="col-12 col-md-6">
                        <label class="form-label">CI Cliente</label>
                        <div style="display: flex; gap: 0.5rem;">
                            <InputText v-model="ciCliente" placeholder="Ingrese CI" style="flex: 1;" />
                            <Button icon="pi pi-search" @click="buscarCliente" />
                            <Button icon="pi pi-plus" @click="agregarCliente" />
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <label class="form-label">Cliente</label>
                        <InputText :value="cliente ? cliente.nombre + ' ' + cliente.apellido : ''" disabled />
                    </div>

                    <!-- METODO -->
                    <div class="col-12 col-md-6">
                        <label class="form-label">Método de Pago</label>
                        <Select v-model="metodoPago" :options="metodosPago" placeholder="Seleccione método" />
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTENIDO -->
        <div class="row g-3 mt-1">
            <div class="col-12 col-xl-8">
                <VentaProductos @agregar="agregarProducto" />
            </div>

            <div class="col-12 col-xl-4">
                <VentaDetalle :detalleVenta="detalleVenta" :total="total" @eliminar="eliminarProducto" />
                <Button label="Guardar Venta" icon="pi pi-save" class="btn btn-primary" style="width: 100%; margin-top: 1rem;" @click="guardarVenta" />
            </div>
        </div>

        <ClienteSave :mostrar="mostrarClienteDialog" :clientes="{}" :modoEdicion="false"
            @close="mostrarClienteDialog = false" @guardar="mostrarClienteDialog = false" />
    </AdminLayout>
</template>

<style scoped>
.eyebrow {
  color: var(--admin-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-3 {
  margin-top: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 1rem;
}

.col-12 {
  grid-column: 1 / -1;
}

.col-md-6 {
  @media (min-width: 768px) {
    grid-column: span 6;
  }
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--admin-text);
}
</style>