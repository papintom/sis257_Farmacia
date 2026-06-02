<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import ProveedorList from '@/components/proveedor/ProveedorList.vue'
import ProveedorSave from '@/components/proveedor/ProveedorSave.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const proveedorListRef = ref<typeof ProveedorList | null>(null)
const proveedorEdit = ref<any>(null)

function handleCreate() {
  proveedorEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(proveedor: any) {
  proveedorEdit.value = proveedor
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  proveedorListRef.value?.obtenerLista()
}
</script>

<template>
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-building" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Suministro</p>
          <h1 class="h3 mb-1">Proveedores</h1>
          <p class="text-muted mb-0">Gestiona proveedores y relaciones comerciales.</p>
        </div>
      </div>
      <div class="heading-actions">
        <button class="btn btn-primary btn-sm" @click="handleCreate">
          <i class="bi bi-plus-circle" aria-hidden="true"></i>
          Nuevo Proveedor
        </button>
      </div>
    </div>

    <section class="panel mt-3">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title">
            <i class="bi bi-table" aria-hidden="true"></i>
            <span>Lista de Proveedores</span>
          </h2>
          <p class="text-muted mb-0">Busca, revisa y gestiona los proveedores registrados.</p>
        </div>
      </div>
      
      <ProveedorList ref="proveedorListRef" @edit="handleEdit" />
    </section>

    <ProveedorSave
      :mostrar="mostrarDialog"
      :proveedor="proveedorEdit"
      :modoEdicion="!!proveedorEdit"
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
