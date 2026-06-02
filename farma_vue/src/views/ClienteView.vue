<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import ClienteList from '@/components/cliente/ClienteList.vue'
import ClienteSave from '@/components/cliente/ClienteSave.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const clienteListRef = ref<typeof ClienteList | null>(null)
const clienteEdit = ref<any>(null)

function handleCreate() {
  clienteEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(cliente: any) {
  clienteEdit.value = cliente
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  clienteListRef.value?.obtenerLista()
}
</script>

<template>
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-person-check" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Gestión</p>
          <h1 class="h3 mb-1">Clientes</h1>
          <p class="text-muted mb-0">Administra clientes, contactos y datos de envío.</p>
        </div>
      </div>
      <div class="heading-actions">
        <button class="btn btn-primary btn-sm" @click="handleCreate">
          <i class="bi bi-person-plus" aria-hidden="true"></i>
          Nuevo Cliente
        </button>
      </div>
    </div>

    <section class="panel mt-3">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title">
            <i class="bi bi-table" aria-hidden="true"></i>
            <span>Lista de Clientes</span>
          </h2>
          <p class="text-muted mb-0">Busca, revisa y gestiona los clientes registrados.</p>
        </div>
      </div>
      
      <ClienteList ref="clienteListRef" @edit="handleEdit" />
    </section>

    <ClienteSave
      :mostrar="mostrarDialog"
      :cliente="clienteEdit"
      :modoEdicion="!!clienteEdit"
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
