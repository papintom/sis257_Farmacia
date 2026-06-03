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
    <div class="panel">
        <div class="panel-header">

            <div style="width: 600px">
                <InputText v-model="busqueda" class="w-100" placeholder="Buscar por nombre, apellido o CI" />
            </div>
        </div>

        <div class="table-responsive">
            <DataTable :value="ventasFiltradas" paginator :rows="10" tableStyle="min-width: 100%">
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

                <Column header="Total">
                    <template #body="{ data }">
                        Bs. {{ data.total }}
                    </template>
                </Column>

                <Column header="Acciones">
                    <template #body="{ data }">
                        <div class="d-flex gap-2">
                            <Button icon="pi pi-eye" severity="info" outlined rounded @click="verDetalle(data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>