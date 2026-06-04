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
const usuarioActual = JSON.parse(
    localStorage.getItem('usuarioActual') || '{}'
)

const idUsuario = ref(usuarioActual.id)

/* =========================
   GUARDAR
========================= */

async function guardarVenta() {

    try {

        const bodyVenta = {

            idCliente: idCliente.value,

            idUsuario: idUsuario.value,

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
        <!-- TÍTULO -->
        <div class="page-heading">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-cart-check" aria-hidden="true"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Ventas</p>
                    <h1 class="h3 mb-1">Nueva Venta</h1>
                    <p class="text-muted mb-0">
                        Registra nuevas ventas y administra los detalles de compra.
                    </p>
                </div>
            </div>
        </div>

        <!-- DATOS DEL CLIENTE -->
        <section class="panel mt-4">
            <div class="panel-header">
                <div>
                    <h2 class="h5 mb-1 section-title">
                        <i class="bi bi-person-vcard"></i>
                        <span>Información del Cliente</span>
                    </h2>
                    <p class="text-muted mb-0">
                        Selecciona el cliente y método de pago.
                    </p>
                </div>
            </div>

            <div class="p-4">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">
                            CI Cliente
                        </label>

                        <div class="d-flex gap-2">
                            <InputText v-model="ciCliente" placeholder="Ingrese CI" style="flex: 1" />

                            <Button icon="pi pi-search" severity="secondary" outlined @click="buscarCliente" />

                            <Button icon="pi pi-plus" severity="secondary" outlined @click="agregarCliente" />
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">
                            Cliente
                        </label>

                        <InputText :value="cliente ? cliente.nombre + ' ' + cliente.apellido : ''" disabled
                            style="width: 100%" />
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">
                            Método de Pago
                        </label>

                        <Select v-model="metodoPago" :options="metodosPago" placeholder="Seleccione método"
                            style="width: 100%" />
                    </div>
                </div>
            </div>
        </section>

        <!-- SECCIÓN DE PRODUCTOS (CÁTALOGO/BUSQUEDA) -->
        <section class="mt-4">
            <VentaProductos @agregar="agregarProducto" />
        </section>

        <!-- SECCIÓN DE DETALLE DE VENTA (LISTADO DE COMPRA) -->
        <section class="panel mt-4">
            <div class="panel-header">
                <h2 class="h5 mb-0 section-title">
                    <i class="bi bi-cart-check-fill"></i>
                    <span>Resumen de Venta</span>
                </h2>
            </div>
            
            <VentaDetalle :detalleVenta="detalleVenta" :total="total" @eliminar="eliminarProducto" />

            <div class="p-4 d-flex justify-content-end">
                <button class="btn btn-primary btn-lg px-5 shadow-sm" @click="guardarVenta">
                    <i class="bi bi-check-circle me-2"></i>
                    Finalizar y Guardar Venta
                </button>
            </div>
        </section>

        <ClienteSave :mostrar="mostrarClienteDialog" :clientes="{}" :modoEdicion="false"
            @close="mostrarClienteDialog = false" @guardar="mostrarClienteDialog = false" />
    </AdminLayout>
</template>

<style scoped></style>