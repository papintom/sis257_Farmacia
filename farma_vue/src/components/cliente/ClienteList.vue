<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'clientes'
const clientes = ref<Cliente[]>([])
const emit = defineEmits(['edit'])
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(cliente: Cliente) {
  emit('edit', cliente)
}

function mostrarEliminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

const clientesFiltrados = computed(() => {
  return clientes.value.filter(
    (cliente) =>
      cliente.ci.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.direccion.toLowerCase().includes(busqueda.value.toLowerCase()),
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
          <InputText v-model="busqueda" placeholder="Buscar cliente" />
        </InputGroup>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table align-middle mb-0">
        <thead>
          <tr>
            <th>Nro.</th>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th class="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(cliente, index) in clientesFiltrados" :key="cliente.id">
            <td>{{ index + 1 }}</td>
            <td>{{ cliente.ci }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellido }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.direccion }}</td>

            <td class="text-end">
              <div class="d-flex justify-content-end gap-2">
                <Button icon="pi pi-pencil" severity="info" outlined rounded @click="emitirEdicion(cliente)" />

                <Button icon="pi pi-trash" severity="danger" outlined rounded
                  @click="mostrarEliminarConfirm(cliente)" />
              </div>
            </td>
          </tr>

          <tr v-if="clientesFiltrados.length === 0">
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
