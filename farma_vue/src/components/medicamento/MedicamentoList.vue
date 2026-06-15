<script lang="ts" setup>
import type { Medicamento } from '@/models/medicamento'
import http from '@/plugins/axios'
import { Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'medicamentos'
const medicamentoes = ref<Medicamento[]>([])
const emit = defineEmits(['edit'])
const medicamentoDelete = ref<Medicamento | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  medicamentoes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(medicamento: Medicamento) {
  emit('edit', medicamento)
}

function mostrarEliminarConfirm(medicamento: Medicamento) {
  medicamentoDelete.value = medicamento
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${medicamentoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

const medicamentoesFiltrados = computed(() => {
  return medicamentoes.value.filter(
    (medicamento) =>
      medicamento.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      medicamento.categoria.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
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
      <div style="width: 600px">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-search"></i>
          </InputGroupAddon>
          <InputText v-model="busqueda" class="w-100" placeholder="Buscar medicamento o categoría" />
        </InputGroup>
      </div>
    </div>

    <div class="table-responsive">
      <DataTable :value="medicamentoesFiltrados" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]"
        tableStyle="min-width: 100%">
        <Column field="nombre" header="Nombre" sortable />

        <Column field="concentracion" header="Concentración" />

        <Column field="formaFarmaceutica.nombre" header="Forma" />

        <Column field="precio" header="Precio">
          <template #body="{ data }">
            Bs. {{ data.precio }}
          </template>
        </Column>

        <Column header="Fotografía">
          <template #body="{ data }">
            <img :src="data.fotografia" alt="Medicamento" class="product-thumb" />
          </template>
        </Column>

        <Column field="categoria.nombre" header="Categoría" sortable />

        <Column header="Acciones">
          <template #body="{ data }">
            <div class="d-flex gap-2">
              <Button icon="pi pi-pencil" severity="info" outlined rounded @click="emitirEdicion(data)" />


              <Button icon="pi pi-trash" severity="danger" outlined rounded @click="mostrarEliminarConfirm(data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>

      <div class="d-flex justify-content-end gap-2 mt-3">
        <Button label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />

        <Button label="Eliminar" severity="danger" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>
<style scoped></style>
