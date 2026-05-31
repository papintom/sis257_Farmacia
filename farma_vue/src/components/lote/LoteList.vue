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
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por canción, álbum o artista" />
      </InputGroup>
    </div>
    <DataTable :value="loteesFiltrados" paginator :rows="5" :rowsPerPageOptions="[5, 10, 25]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} a {last} de {totalRecords}" scrollable scroll-height="flex"
      tableStyle="min-width: 50rem">
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>


      <Column field="medicamento.nombre" header="Medicamento" sortable></Column>
      <Column field="proveedor.nombre" header="Proveedor" sortable></Column>
      <Column field="stock" header="Stock" sortable></Column>
      <Column field="fechaVencimiento" header="Fecha de Vencimiento" sortable></Column>
      <Column header="Acciones" frozen align-frozen="right" style="min-width: 160px">
        <template #body="{ data }">
          <Button icon="pi pi-youtube" aria-label="Enlace" text as="a" :href="data.url" target="_blank" />
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(data)" />
        </template>
      </Column>
    </DataTable>
    <table v-if="false">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Medicamento</th>
          <th>Proveedores</th>
          <th>stock</th>
          <th>Fecha de Vencimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(lote, index) in loteesFiltrados" :key="lote.id">
          <td>{{ index + 1 }}</td>
          <td>{{ lote.medicamento.nombre }}</td>
          <td>{{ lote.proveedor.nombre }}</td>
          <td>{{ lote.stock }}</td>
          <td>{{ lote.fechaVencimiento }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(lote)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(lote)" />
          </td>
        </tr>
        <tr v-if="loteesFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
