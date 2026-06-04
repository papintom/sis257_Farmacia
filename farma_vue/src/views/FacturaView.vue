<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import http from '@/plugins/axios'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const route = useRoute()

const venta = ref<any>(null)
const detalles = ref<any[]>([])

async function cargarFactura() {

    const idVenta = route.params.id
    console.log('ID VENTA:', idVenta)

    venta.value = await http
        .get(`ventas/${idVenta}`)
        .then(res => res.data)
    console.log('VENTA:', venta.value)
    detalles.value = await http
        .get(`detalle-ventas/venta/${idVenta}`)
        .then(res => res.data)

}
function imprimir() {
    window.print()
}

onMounted(() => {
    cargarFactura()
})
</script>

<template>

    <div class="p-4">

        <div class="card p-5">

            <div class="flex justify-between mb-4">

                <div>

                    <h1 class="text-3xl font-bold">
                        FARMACIA
                    </h1>

                    <p>Comprobante de Venta</p>

                </div>

                <div>

                    <h2>
                        Venta N° {{ venta?.id }}
                    </h2>

                </div>

            </div>

            <hr class="mb-4">

            <div class="grid">

                <div class="col-12 md:col-6">

                    <h3>Datos Cliente</h3>

                    <p>
                        <b>Nombre:</b>
                        {{ venta?.cliente?.nombre }}
                        {{ venta?.cliente?.apellido }}
                    </p>

                    <p>
                        <b>CI:</b>
                        {{ venta?.cliente?.ci }}
                    </p>

                </div>

                <div class="col-12 md:col-6">

                    <h3>Datos Venta</h3>

                    <p>
                        <b>Fecha:</b>
                        {{ new Date(venta?.fecha).toLocaleString() }}
                    </p>

                    <p>
                        <b>Método Pago:</b>
                        {{ venta?.metodoPago }}
                    </p>

                    <p>
                        <b>Atendido por:</b>
                        {{ venta?.usuario?.nombre }}
                        {{ venta?.usuario?.apellido }}
                    </p>

                </div>

            </div>

            <h3 class="mt-4 mb-3">
                Detalle de Medicamentos
            </h3>

            <DataTable :value="detalles">

                <Column field="lote.id" header="Lote" />

                <Column field="lote.medicamento.nombre" header="Medicamento" />

                <Column field="cantidad" header="Cantidad" />

                <Column field="precioUnitario" header="Precio Unit." />

                <Column field="subtotal" header="Subtotal" />

            </DataTable>

            <div class="flex justify-end mt-4">

                <h2>
                    Total: Bs. {{ venta?.total }}
                </h2>

            </div>

            <div class="flex justify-end gap-2 mt-4 no-print">

                <Button label="Imprimir" icon="pi pi-print" @click="imprimir" />

            </div>

        </div>

    </div>

</template>

<style scoped>
@media print {

    .no-print {
        display: none;
    }

}
</style>