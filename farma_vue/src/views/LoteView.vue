<script setup lang="ts">
import LoteList from '@/components/lote/LoteList.vue'
import LoteSave from '@/components/lote/LoteSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const loteListRef = ref<typeof LoteList | null>(null)
const loteEdit = ref<any>(null)

function handleCreate() {
  loteEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(lote: any) {
  loteEdit.value = lote
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  loteListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Lotes</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <LoteList ref="loteListRef" @edit="handleEdit" />
    <LoteSave
      :mostrar="mostrarDialog"
      :lote="loteEdit"
      :modoEdicion="!!loteEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
