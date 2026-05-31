<script setup lang="ts">
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useRouter } from 'vue-router'

const router = useRouter()

import { computed, onMounted, ref } from 'vue'
import { InputText } from 'primevue'

const ventas = ref<any[]>([])
const busqueda = ref('')


async function obtenerVentas() {
    ventas.value = await http
        .get('ventas')
        .then((res) => res.data)
}
const ventasFiltradas = computed(() => {

    return ventas.value.filter((venta) => {

        const texto = busqueda.value.toLowerCase()

        const nombreCompleto =
            `${venta.cliente?.nombre ?? ''} ${venta.cliente?.apellido ?? ''}`
                .toLowerCase()

        const ci =
            venta.cliente?.ci?.toString() ?? ''

        return (
            nombreCompleto.includes(texto) ||
            ci.includes(texto)
        )
    })

})

function verDetalle(venta: any) {

    router.push(`/factura/${venta.id}`)

}

onMounted(() => {
    obtenerVentas()
})
</script>

<template>

    <div class="card">

        <h2 class="mb-4">
            Historial de Ventas
        </h2>
        <div class="mb-4">

            <InputText v-model="busqueda" placeholder="Buscar por nombre, apellido o CI" class="w-full" />

        </div>

        <DataTable :value="ventasFiltradas" paginator :rows="10" tableStyle="min-width: 60rem">

            <Column field="id" header="#" />

            <Column field="fecha" header="Fecha" />
            <Column field="cliente.ci" header="CI" />

            <Column header="Cliente">

                <template #body="{ data }">

                    {{ data.cliente.nombre }}
                    {{ data.cliente.apellido }}

                </template>

            </Column>

            <Column field="metodoPago" header="Método Pago" />

            <Column field="total" header="Total" />

            <Column header="Acciones">

                <template #body="{ data }">

                    <Button icon="pi pi-eye" label="Ver" @click="verDetalle(data)" />

                </template>

            </Column>

        </DataTable>



    </div>

</template>