<script setup lang="ts">
import type { Laboratorio } from '@/models/laboratorio'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'laboratorios'
const laboratorios = ref<Laboratorio[]>([])
const emit = defineEmits(['edit'])
const laboratorioDelete = ref<Laboratorio | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
    laboratorios.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(laboratorio: Laboratorio) {
    emit('edit', laboratorio)
}

function mostrarEliminarConfirm(laboratorio: Laboratorio) {
    laboratorioDelete.value = laboratorio
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${laboratorioDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
}

const laboratoriosFiltrados = computed(() => {
    return laboratorios.value.filter(
        (laboratorio) =>
            laboratorio.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
            (laboratorio.descripcion && laboratorio.descripcion.toLowerCase().includes(busqueda.value.toLowerCase())) ||
            (laboratorio.direccion && laboratorio.direccion.toLowerCase().includes(busqueda.value.toLowerCase())) ||
            (laboratorio.telefono && laboratorio.telefono.toLowerCase().includes(busqueda.value.toLowerCase())),
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
                    <InputText v-model="busqueda" placeholder="Buscar laboratorio" />
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
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(laboratorio, index) in laboratoriosFiltrados" :key="laboratorio.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ laboratorio.nombre }}</td>
                        <td>{{ laboratorio.descripcion || '-' }}</td>
                        <td>{{ laboratorio.direccion || '-' }}</td>
                        <td>{{ laboratorio.telefono || '-' }}</td>
                        <td class="text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <Button icon="pi pi-pencil" severity="info" outlined rounded
                                    @click="emitirEdicion(laboratorio)" />
                                <Button icon="pi pi-trash" severity="danger" outlined rounded
                                    @click="mostrarEliminarConfirm(laboratorio)" />
                            </div>
                        </td>
                    </tr>

                    <tr v-if="laboratoriosFiltrados.length === 0">
                        <td colspan="6" class="text-center">
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

<style scoped></style>
