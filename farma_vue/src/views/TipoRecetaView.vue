<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import TipoRecetaList from '@/components/tipoReceta/TipoRecetaList.vue'
import TipoRecetaSave from '@/components/tipoReceta/TipoRecetaSave.vue'
import { ref } from 'vue'

const mostrarTipoReceta = ref(false)
const tipoRecetaListRef = ref<any>(null)
const tipoRecetaEdit = ref<any>(null)

function handleCreateTipoReceta() {
    tipoRecetaEdit.value = null
    mostrarTipoReceta.value = true
}

function handleEditTipoReceta(tipo: any) {
    tipoRecetaEdit.value = tipo
    mostrarTipoReceta.value = true
}

function handleGuardarTipoReceta() {
    tipoRecetaListRef.value?.obtenerLista()
}
</script>

<template>
    <AdminLayout>
        <div class="page-heading">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-file-earmark-medical"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Gestión</p>
                    <h1 class="h3 mb-1">Tipos de Receta</h1>
                    <p class="text-muted mb-0">Administra clasificaciones y requisitos de recetas médicas.</p>
                </div>
            </div>

            <div class="heading-actions">
                <button class="btn btn-primary btn-sm" @click="handleCreateTipoReceta">
                    <i class="bi bi-plus"></i>
                    Nuevo Tipo
                </button>
            </div>
        </div>

        <section class="panel mt-3">
            <TipoRecetaList ref="tipoRecetaListRef" @edit="handleEditTipoReceta" />
        </section>

        <TipoRecetaSave :mostrar="mostrarTipoReceta" :tipoReceta="tipoRecetaEdit" :modoEdicion="!!tipoRecetaEdit"
            @guardar="handleGuardarTipoReceta" @close="mostrarTipoReceta = false" />
    </AdminLayout>
</template>

<style scoped>
.eyebrow {
    color: var(--admin-primary);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
}
</style>
