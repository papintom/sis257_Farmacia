<script setup lang="ts">
import type { FormaFarmaceutica } from '@/models/formaFarmaceutica'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'formas-farmaceuticas'
const formasFarmaceuticas = ref<FormaFarmaceutica[]>([])
const emit = defineEmits(['edit'])
const formasFarmaceuticaDelete = ref<FormaFarmaceutica | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
    formasFarmaceuticas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(formasFarmaceutica: FormaFarmaceutica) {
    emit('edit', formasFarmaceutica)
}

function mostrarEliminarConfirm(formasFarmaceutica: FormaFarmaceutica) {
    formasFarmaceuticaDelete.value = formasFarmaceutica
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${formasFarmaceuticaDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
}

const formasFarmaceuticasFiltrados = computed(() => {
    return formasFarmaceuticas.value.filter(
        (formasFarmaceutica) =>
            formasFarmaceutica.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
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
                    <InputText v-model="busqueda" placeholder="Buscar formasFarmaceutica" />
                </InputGroup>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table align-middle mb-0">
                <thead>
                    <tr>
                        <th>Nro.</th>
                        <th>Nombre</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(formaFarmaceutica, index) in formasFarmaceuticasFiltrados" :key="String(formaFarmaceutica.id)">
                        <td>{{ index + 1 }}</td>
                        <td>{{ formaFarmaceutica.nombre }}</td>

                        <td class="text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <Button icon="pi pi-pencil" severity="info" outlined rounded
                                    @click="emitirEdicion(formaFarmaceutica)" />
                                <Button icon="pi pi-trash" severity="danger" outlined rounded
                                    @click="mostrarEliminarConfirm(formaFarmaceutica)" />
                            </div>
                        </td>
                    </tr>



                    <tr v-if="formasFarmaceuticasFiltrados.length === 0">
                        <td colspan="7" class="text-center">
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
