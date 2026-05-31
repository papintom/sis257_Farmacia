<script setup lang="ts">
import MedicamentoList from '@/components/medicamento/MedicamentoList.vue'
import MedicamentoSave from '@/components/medicamento/MedicamentoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const medicamentoListRef = ref<typeof MedicamentoList | null>(null)
const medicamentoEdit = ref<any>(null)

function handleCreate() {
  medicamentoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(medicamento: any) {
  medicamentoEdit.value = medicamento
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  medicamentoListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Medicamentos</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <MedicamentoList ref="medicamentoListRef" @edit="handleEdit" />
    <MedicamentoSave
      :mostrar="mostrarDialog"
      :medicamento="medicamentoEdit"
      :modoEdicion="!!medicamentoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
