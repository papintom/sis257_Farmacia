<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'

import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { InputText, RowClasses } from 'primevue'

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

function obtenerEstado(fechaVencimiento: string) {
    const hoy = new Date()
    const vencimiento = new Date(fechaVencimiento)

    const diferenciaDias = Math.ceil(
        (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diferenciaDias < 0) {
        return 'vencido'
    }

    if (diferenciaDias <= 30) {
        return 'proximo'
    }

    return 'vigente'
}
function rowClass(data: any) {
    const estado = obtenerEstado(data.fechaVencimiento)

    return {
        'fila-vencida': estado === 'vencido',
        'fila-proxima': estado === 'proximo'
    }
}



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
            <DataTable :value="lotesFiltrados" :rowClass="rowClass" paginator :rows="5">
                <Column field="medicamento.nombre" header="Medicamento" />

                <Column field="codigo" header="N° Lote" />

                <Column header="Fecha Vencimiento">
                    <template #body="{ data }">
                        {{ new Date(data.fechaVencimiento).toLocaleDateString() }}
                    </template>
                </Column>

                <Column header="Receta">
                    <template #body="{ data }">
                        {{ data.receta ? 'Sí' : 'No' }}
                    </template>
                </Column>
                <Column field="stock" header="Stock" />

                <Column field="medicamento.precio" header="Precio">
                    <template #body="{ data }">
                        Bs. {{ data.medicamento.precio }}
                    </template>
                </Column>
                <Column header="Estado">
                    <template #body="{ data }">
                        <span :class="{
                            'estado-vencido': obtenerEstado(data.fechaVencimiento) === 'vencido',
                            'estado-proximo': obtenerEstado(data.fechaVencimiento) === 'proximo',
                            'estado-vigente': obtenerEstado(data.fechaVencimiento) === 'vigente'
                        }">
                            {{
                                obtenerEstado(data.fechaVencimiento) === 'vencido'
                                    ? 'Vencido'
                                    : obtenerEstado(data.fechaVencimiento) === 'proximo'
                                        ? 'Próximo'
                                        : 'Vigente'
                            }}
                        </span>
                    </template>
                </Column>

                <Column header="Acciones">
                    <template #body="{ data }">
                        <div class="d-flex gap-2">
                            <Button icon="pi pi-plus" severity="success" outlined rounded
                                :disabled="obtenerEstado(data.fechaVencimiento) === 'vencido'"
                                @click="emit('agregar', data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<style scoped>
/* Badges */

.estado-vencido {
    background: #dc3545;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}

.estado-proximo {
    background: #ffc107;
    color: #212529;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}

.estado-vigente {
    background: #198754;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}
</style>