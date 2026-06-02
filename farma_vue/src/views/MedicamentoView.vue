<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import MedicamentoList from '@/components/medicamento/MedicamentoList.vue'
import MedicamentoSave from '@/components/medicamento/MedicamentoSave.vue'
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
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-capsule" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Inventario</p>
          <h1 class="h3 mb-1">Medicamentos</h1>
          <p class="text-muted mb-0">Gestiona el catálogo de medicamentos y medicinas.</p>
        </div>
      </div>
      <div class="heading-actions">
        <button class="btn btn-primary btn-sm" @click="handleCreate">
          <i class="bi bi-plus-circle" aria-hidden="true"></i>
          Nuevo Medicamento
        </button>
      </div>
    </div>

    <section class="panel mt-3">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title">
            <i class="bi bi-table" aria-hidden="true"></i>
            <span>Lista de Medicamentos</span>
          </h2>
          <p class="text-muted mb-0">Busca, revisa y gestiona medicamentos del inventario.</p>
        </div>
      </div>
      
      <MedicamentoList ref="medicamentoListRef" @edit="handleEdit" />
    </section>

    <MedicamentoSave
      :mostrar="mostrarDialog"
      :medicamento="medicamentoEdit"
      :modoEdicion="!!medicamentoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </AdminLayout>
</template>

<style scoped>
.eyebrow {
  color: var(--admin-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
