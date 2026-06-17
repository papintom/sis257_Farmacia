<script setup lang="ts">
import type { TipoReceta } from '@/models/tipoReceta'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'tipo-recetas'
const tipoRecetas = ref<TipoReceta[]>([])
const emit = defineEmits(['edit'])
const tipoRecetaDelete = ref<TipoReceta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
    tipoRecetas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(tipoReceta: TipoReceta) {
    emit('edit', tipoReceta)
}

function mostrarEliminarConfirm(tipoReceta: TipoReceta) {
    tipoRecetaDelete.value = tipoReceta
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${tipoRecetaDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
}

const tipoRecetasFiltrados = computed(() => {
    return tipoRecetas.value.filter(
        (tipo) =>
            tipo.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
            (tipo.descripcion && tipo.descripcion.toLowerCase().includes(busqueda.value.toLowerCase())),
    )
})

onMounted(() => {
    obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
    <div class="panel">
        <div class="panel-header">
            <div style="width: 320px">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-search"></i>
                    </InputGroupAddon>
                    <InputText v-model="busqueda" placeholder="Buscar tipo de receta" />
                </InputGroup>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table align-middle mb-0">
                <thead>
                    <tr>
                        <th>Nro.</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Requiere Autorización</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(tipo, index) in tipoRecetasFiltrados" :key="tipo.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ tipo.nombre }}</td>
                        <td>{{ tipo.descripcion || '-' }}</td>
                        <td>
                            <span :class="['badge', tipo.requiereAutorizacion ? 'bg-danger' : 'bg-success']">
                                {{ tipo.requiereAutorizacion ? 'Sí' : 'No' }}
                            </span>
                        </td>
                        <td class="text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <Button icon="pi pi-pencil" severity="info" outlined rounded
                                    @click="emitirEdicion(tipo)" />
                                <Button icon="pi pi-trash" severity="danger" outlined rounded
                                    @click="mostrarEliminarConfirm(tipo)" />
                            </div>
                        </td>
                    </tr>

                    <tr v-if="tipoRecetasFiltrados.length === 0">
                        <td colspan="5" class="text-center">
                            No se encontraron resultados.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
            <p>¿Estás seguro de que deseas eliminar este registro?</p>

            <div class="d-flex justify-content-end gap-2 mt-2">
                <Button label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
                <Button label="Eliminar" severity="danger" @click="eliminar" />
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
.badge {
    padding: 0.35em 0.65em;
    font-size: 0.75em;
    font-weight: 700;
    border-radius: 0.25rem;
}
.bg-danger {
    background-color: #dc3545;
    color: #fff;
}
.bg-success {
    background-color: #198754;
    color: #fff;
}
</style>
