<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'

import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { InputText } from 'primevue'

const lotes = ref<any[]>([])
const busquedaMedicamento = ref('')

async function obtenerLotes() {
    lotes.value = await http
        .get('lotes')
        .then((response) => response.data)
}

const lotesFiltrados = computed(() => {
    return lotes.value.filter(
        (lote) =>
            lote.medicamento.nombre
                .toLowerCase()
                .includes(busquedaMedicamento.value.toLowerCase()) ||
            lote.id
                .toString()
                .includes(busquedaMedicamento.value)
    )
})

onMounted(() => {
    obtenerLotes()
})
const emit = defineEmits(['agregar'])



</script>

<template>

    <div class="card p-4">

        <h2 class="text-2xl font-bold mb-4">
            Medicamentos
        </h2>
        <div class="mb-4">
            <InputText v-model="busquedaMedicamento" placeholder="Buscar medicamento..." class="w-full" />
        </div>

        <DataTable :value="lotesFiltrados" paginator :rows="5">

            <Column field="medicamento.nombre" header="Medicamento" />
            <Column field="id" header="N° Lote" />
            <Column field="fechaVencimiento" header="Fecha Vencimiento" />

            <Column field="stock" header="Stock" />

            <Column field="medicamento.precio" header="Precio" />

            <Column header="Acción">

                <template #body="{ data }">

                    <Button label="Agregar" icon="pi pi-plus" @click="emit('agregar', data)" />

                </template>

            </Column>

        </DataTable>

    </div>

</template>