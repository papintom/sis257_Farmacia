<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import UsuarioList from '@/components/usuario/UsuarioList.vue'
import UsuarioSave from '@/components/usuario/UsuarioSave.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const usuarioListRef = ref<typeof UsuarioList | null>(null)
const usuarioEdit = ref<any>(null)

function handleCreate() {
  usuarioEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(usuario: any) {
  usuarioEdit.value = usuario
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  usuarioListRef.value?.obtenerLista()
}
</script>

<template>
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-people" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Management</p>
          <h1 class="h3 mb-1">Usuarios</h1>
          <p class="text-muted mb-0">Gestiona usuarios, roles y permisos del sistema.</p>
        </div>
      </div>
      <div class="heading-actions">
        <button class="btn btn-primary btn-sm" @click="handleCreate">
          <i class="bi bi-person-plus" aria-hidden="true"></i>
          Crear Usuario
        </button>
      </div>
    </div>

    <section class="panel mt-3">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title">
            <i class="bi bi-table" aria-hidden="true"></i>
            <span>Lista de Usuarios</span>
          </h2>
          <p class="text-muted mb-0">Busca, revisa y gestiona los usuarios registrados.</p>
        </div>
      </div>

      <UsuarioList ref="usuarioListRef" @edit="handleEdit" />
    </section>

    <UsuarioSave :mostrar="mostrarDialog" :usuario="usuarioEdit" :modoEdicion="!!usuarioEdit" @guardar="handleGuardar"
      @close="handleCloseDialog" />
  </AdminLayout>
</template>

<style scoped></style>
