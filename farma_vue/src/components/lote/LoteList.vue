<script lang="ts" setup>
import type { Lote } from '@/models/lote'
import http from '@/plugins/axios'
import { Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'lotes'
const lotes = ref<Lote[]>([])
const emit = defineEmits(['edit'])
const loteDelete = ref<Lote | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  lotes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(lote: Lote) {
  emit('edit', lote)
}

function mostrarEliminarConfirm(lote: Lote) {
  loteDelete.value = lote
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${loteDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

const loteesFiltrados = computed(() => {
  return lotes.value.filter(
    (lote) =>
      lote.medicamento.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      lote.proveedor.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
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


      <div style="width: 400px">
        <div style="width: 320px" class="search-box">
          <InputGroup>
            <InputGroupAddon class="search-addon">
              <i class="pi pi-search"></i>
            </InputGroupAddon>
            <InputText v-model="busqueda" type="text" placeholder="Buscar nombre cliente ,ci " class="search-input" />
          </InputGroup>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <DataTable :value="loteesFiltrados" paginator :rows="5" :rowsPerPageOptions="[5, 10, 25]"
        tableStyle="min-width: 100%">
        <Column field="medicamento.nombre" header="Medicamento" sortable />

        <Column field="codigo" header="Código Lote" sortable />

        <Column field="proveedor.nombre" header="Proveedor" sortable />

        <Column field="stock" header="Stock" sortable />

        <Column header="Fecha Vencimiento" sortable>
          <template #body="{ data }">
            {{
              new Date(data.fechaVencimiento).toLocaleDateString('es-BO')
            }}
          </template>
        </Column>

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
