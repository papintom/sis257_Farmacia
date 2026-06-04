<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'categorias'
const categorias = ref<Categoria[]>([])
const emit = defineEmits(['edit'])
const categoriaDelete = ref<Categoria | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
    categorias.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(categoria: Categoria) {
    emit('edit', categoria)
}

function mostrarEliminarConfirm(categoria: Categoria) {
    categoriaDelete.value = categoria
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${categoriaDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
}

const categoriasFiltrados = computed(() => {
    return categorias.value.filter(
        (categoria) =>
            categoria.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
            categoria.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()),
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
                    <InputText v-model="busqueda" placeholder="Buscar categoria" />
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
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(categoria, index) in categoriasFiltrados" :key="categoria.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ categoria.nombre }}</td>
                        <td>{{ categoria.descripcion }}</td>
                        <td class="text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <Button icon="pi pi-pencil" severity="info" outlined rounded
                                    @click="emitirEdicion(categoria)" />
                                <Button icon="pi pi-trash" severity="danger" outlined rounded
                                    @click="mostrarEliminarConfirm(categoria)" />
                            </div>
                        </td>
                    </tr>



                    <tr v-if="categoriasFiltrados.length === 0">
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
