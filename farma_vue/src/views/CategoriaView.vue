<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'

import CategoriaList from '@/components/categoria/CategoriaList.vue'
import CategoriaSave from '@/components/categoria/CategoriaSave.vue'

import FormaFarmaceuticaList from '@/components/formaFarmaceutica/FormaFarmaceuticaList.vue'
import FormaFarmaceuticaSave from '@/components/formaFarmaceutica/FormaFarmaceuticaSave.vue'

import { ref } from 'vue'

/* =========================
   CATEGORÍAS
========================= */
const mostrarCategoria = ref(false)
const categoriaListRef = ref<any>(null)
const categoriaEdit = ref<any>(null)

function handleCreateCategoria() {
    categoriaEdit.value = null
    mostrarCategoria.value = true
}

function handleEditCategoria(categoria: any) {
    categoriaEdit.value = categoria
    mostrarCategoria.value = true
}

function handleGuardarCategoria() {
    categoriaListRef.value?.obtenerLista()
}

/* =========================
   FORMAS FARMACÉUTICAS
========================= */
const mostrarForma = ref(false)
const formaListRef = ref<any>(null)
const formaEdit = ref<any>(null)

function handleCreateForma() {
    formaEdit.value = null
    mostrarForma.value = true
}

function handleEditForma(forma: any) {
    formaEdit.value = forma
    mostrarForma.value = true
}

function handleGuardarForma() {
    formaListRef.value?.obtenerLista()
}
</script>

<template>
    <AdminLayout>

        <!-- =========================
         CATEGORÍAS
    ========================= -->
        <div class="page-heading">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-grid"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Gestión</p>
                    <h1 class="h3 mb-1">Categorías</h1>
                    <p class="text-muted mb-0">Administra categorías.</p>
                </div>
            </div>

            <div class="heading-actions">
                <button class="btn btn-primary btn-sm" @click="handleCreateCategoria">
                    <i class="bi bi-plus"></i>
                    Nueva Categoría
                </button>
            </div>
        </div>

        <section class="panel mt-3">
            <CategoriaList ref="categoriaListRef" @edit="handleEditCategoria" />
        </section>

        <CategoriaSave :mostrar="mostrarCategoria" :categoria="categoriaEdit" :modoEdicion="!!categoriaEdit"
            @guardar="handleGuardarCategoria" @close="mostrarCategoria = false" />

        <!-- =========================
         FORMAS FARMACÉUTICAS
    ========================= -->
        <div class="page-heading mt-5">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-capsule"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Gestión</p>
                    <h1 class="h3 mb-1">Formas Farmacéuticas</h1>
                    <p class="text-muted mb-0">Administra formas farmacéuticas.</p>
                </div>
            </div>

            <div class="heading-actions">
                <button class="btn btn-primary btn-sm" @click="handleCreateForma">
                    <i class="bi bi-plus"></i>
                    Nueva Forma
                </button>
            </div>
        </div>

        <section class="panel mt-3">
            <FormaFarmaceuticaList ref="formaListRef" @edit="handleEditForma" />
        </section>

        <FormaFarmaceuticaSave :mostrar="mostrarForma" :formasFarmaceutica="formaEdit" :modoEdicion="!!formaEdit"
            @guardar="handleGuardarForma" @close="mostrarForma = false" />

    </AdminLayout>
</template>

<style scoped>
.eyebrow {
    color: var(--admin-primary);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
}

.mt-5 {
    margin-top: 2rem;
}
</style>