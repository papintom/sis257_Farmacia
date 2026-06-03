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
    <div class="panel">
        <div class="panel-header">
            <div>
                <h2 class="h5 mb-1 section-title">
                    <i class="bi bi-capsule"></i>
                    <span>Medicamentos</span>
                </h2>
                <p class="text-muted mb-0">
                    Selecciona medicamentos para agregar a la venta.
                </p>
            </div>

            <div style="width: 350px">
                <InputText v-model="busquedaMedicamento" placeholder="Buscar medicamento..." />
            </div>
        </div>

        <div class="table-responsive">
            <DataTable :value="lotesFiltrados" paginator :rows="5" tableStyle="min-width: 100%">
                <Column field="medicamento.nombre" header="Medicamento" />

                <Column field="id" header="N° Lote" />

                <Column field="fechaVencimiento" header="Fecha Vencimiento" />

                <Column field="stock" header="Stock" />

                <Column field="medicamento.precio" header="Precio">
                    <template #body="{ data }">
                        Bs. {{ data.medicamento.precio }}
                    </template>
                </Column>

                <Column header="Acciones">
                    <template #body="{ data }">
                        <div class="d-flex gap-2">
                            <Button icon="pi pi-plus" severity="success" outlined rounded
                                @click="emit('agregar', data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>