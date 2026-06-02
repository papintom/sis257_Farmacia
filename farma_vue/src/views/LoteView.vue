<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import LoteList from '@/components/lote/LoteList.vue'
import LoteSave from '@/components/lote/LoteSave.vue'
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
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-boxes" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Inventario</p>
          <h1 class="h3 mb-1">Lotes</h1>
          <p class="text-muted mb-0">Administra lotes, fechas de vencimiento y trazabilidad.</p>
        </div>
      </div>
      <div class="heading-actions">
        <button class="btn btn-primary btn-sm" @click="handleCreate">
          <i class="bi bi-plus-circle" aria-hidden="true"></i>
          Nuevo Lote
        </button>
      </div>
    </div>

    <section class="panel mt-3">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title">
            <i class="bi bi-table" aria-hidden="true"></i>
            <span>Lista de Lotes</span>
          </h2>
          <p class="text-muted mb-0">Busca, revisa y gestiona lotes del sistema.</p>
        </div>
      </div>
      
      <LoteList ref="loteListRef" @edit="handleEdit" />
    </section>

    <LoteSave
      :mostrar="mostrarDialog"
      :lote="loteEdit"
      :modoEdicion="!!loteEdit"
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
