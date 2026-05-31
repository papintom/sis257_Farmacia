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
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por medicamento,categoria " />
      </InputGroup>
    </div>

    <DataTable
      :value="medicamentoesFiltrados"
      paginator
      :rows="2"
      :rowsPerPageOptions="[5, 10, 20]"
      :scrollable="true"
      scrollHeight="400px"
      tableStyle="min-width: 50rem"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <Column field="nombre" header="Nombre" sortable></Column>
      <Column field="concentracion" header="Concentracion"></Column>
      <Column field="forma" header="Forma"></Column>
      <Column field="precio" header="Precio"></Column>
      <Column field="fotografia" header="Fotografia">
        <template #body="{ data }">
          <img
            :src="data.fotografia"
            alt="Fotografia"
            style="width: 50px; height: 50px; object-fit: cover"
          />
        </template>
      </Column>
      <Column field="categoria.nombre" header="Categoria" sortable></Column>
      <Column header="Acciones" frozen align-frozen="right" style="min-width: 160px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-youtube"
            aria-label="Enlace YouTube"
            text
            as="a"
            :href="data.url"
            target="_blank"
          />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            text
            @click="mostrarEliminarConfirm(data)"
          />
        </template>
      </Column>
    </DataTable>

    <table v-if="false">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Concentracion</th>
          <th>Forma</th>
          <th>Precio</th>
          <th>Fotografia</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(medicamento, index) in medicamentoesFiltrados" :key="medicamento.id">
          <td>{{ index + 1 }}</td>
          <td>{{ medicamento.nombre }}</td>
          <td>{{ medicamento.concentracion }}</td>
          <td>{{ medicamento.forma }}</td>
          <td>{{ medicamento.precio }}</td>
          <td>{{ medicamento.fotografia }}</td>
          <td>{{ medicamento.categoria.nombre }}</td>

          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(medicamento)"
            />
            <Button
              icon="pi pi-youtube"
              aria-label="Enlace YouTube"
              text
              as="a"
              :href="medicamento.descripcion"
              target="_blank"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(medicamento)"
            />
          </td>
        </tr>
        <tr v-if="medicamentoesFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>
<style scoped></style>
