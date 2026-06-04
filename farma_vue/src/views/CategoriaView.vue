<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import CategoriaList from '@/components/categoria/CategoriaList.vue'
import CategoriaSave from '@/components/categoria/CategoriaSave.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const categoriaListRef = ref<typeof CategoriaList | null>(null)
const categoriaEdit = ref<any>(null)

function handleCreate() {
    categoriaEdit.value = null
    mostrarDialog.value = true
}

function handleEdit(categoria: any) {
    categoriaEdit.value = categoria
    mostrarDialog.value = true
}

function handleCloseDialog() {
    mostrarDialog.value = false
}

function handleGuardar() {
    categoriaListRef.value?.obtenerLista()
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
                    <h1 class="h3 mb-1">Categorías</h1>
                    <p class="text-muted mb-0">Administra categorias.</p>
                </div>
            </div>
            <div class="heading-actions">
                <button class="btn btn-primary btn-sm" @click="handleCreate">
                    <i class="bi bi-person-plus" aria-hidden="true"></i>
                    Nueva Categoría
                </button>
            </div>
        </div>

        <section class="panel mt-3">
            <div class="panel-header">
                <div>
                    <h2 class="h5 mb-1 section-title">
                        <i class="bi bi-table" aria-hidden="true"></i>
                        <span>Lista de Categorías</span>
                    </h2>
                    <p class="text-muted mb-0">Busca, revisa y gestiona los categorias registrados.</p>
                </div>
            </div>

            <CategoriaList ref="categoriaListRef" @edit="handleEdit" />
        </section>

        <CategoriaSave :mostrar="mostrarDialog" :categoria="categoriaEdit" :modoEdicion="!!categoriaEdit"
            @guardar="handleGuardar" @close="handleCloseDialog" />
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
