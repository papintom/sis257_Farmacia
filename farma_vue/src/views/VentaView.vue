<script setup lang="ts">
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

    <div class="p-4">

        <h1 class="text-3xl font-bold mb-4">
            Nueva Venta
        </h1>

        <!-- CABECERA -->

        <div class="card p-4 mb-4">

            <div class="grid">

                <!-- CLIENTE -->

                <div class="col-12 md:col-6">

                    <label class="font-semibold block mb-2">
                        CI Cliente
                    </label>

                    <div class="flex gap-2">

                        <InputText v-model="ciCliente" placeholder="Ingrese CI" class="w-full" />

                        <Button icon="pi pi-search" @click="buscarCliente" />
                        <Button icon="pi pi-plus" @click="agregarCliente" />

                    </div>

                </div>

                <div class="col-12 md:col-6">

                    <label class="font-semibold block mb-2">
                        Cliente
                    </label>

                    <InputText :value="cliente ? cliente.nombre + ' ' + cliente.apellido : ''" disabled
                        class="w-full" />

                </div>

                <!-- METODO -->

                <div class="col-12 md:col-6">

                    <label>Método Pago</label>

                    <Select v-model="metodoPago" :options="metodosPago" placeholder="Seleccione método"
                        class="w-full mt-2" />

                </div>

            </div>

        </div>

        <!-- CONTENIDO -->

        <div class="grid">

            <div class="col-12 md:col-7">

                <VentaProductos @agregar="agregarProducto" />

            </div>

            <div class="col-12 md:col-5">

                <VentaDetalle :detalleVenta="detalleVenta" :total="total" @eliminar="eliminarProducto" />

                <Button label="Guardar Venta" icon="pi pi-save" class="w-full mt-4" @click="guardarVenta" />

            </div>

        </div>

    </div>

    <ClienteSave :mostrar="mostrarClienteDialog" :clientes="{}" :modoEdicion="false"
        @close="mostrarClienteDialog = false" @guardar="mostrarClienteDialog = false" />

</template>