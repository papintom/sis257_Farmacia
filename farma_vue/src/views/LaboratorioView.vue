<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import LaboratorioList from '@/components/laboratorio/LaboratorioList.vue'
import LaboratorioSave from '@/components/laboratorio/LaboratorioSave.vue'
import { ref } from 'vue'

const mostrarLaboratorio = ref(false)
const laboratorioListRef = ref<any>(null)
const laboratorioEdit = ref<any>(null)

function handleCreateLaboratorio() {
    laboratorioEdit.value = null
    mostrarLaboratorio.value = true
}

function handleEditLaboratorio(laboratorio: any) {
    laboratorioEdit.value = laboratorio
    mostrarLaboratorio.value = true
}

function handleGuardarLaboratorio() {
    laboratorioListRef.value?.obtenerLista()
}
</script>

<template>
    <AdminLayout>
        <div class="page-heading">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-building"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Gestión</p>
                    <h1 class="h3 mb-1">Laboratorios</h1>
                    <p class="text-muted mb-0">Administra laboratorios y fabricantes.</p>
                </div>
            </div>

            <div class="heading-actions">
                <button class="btn btn-primary btn-sm" @click="handleCreateLaboratorio">
                    <i class="bi bi-plus"></i>
                    Nuevo Laboratorio
                </button>
            </div>
        </div>

        <section class="panel mt-3">
            <LaboratorioList ref="laboratorioListRef" @edit="handleEditLaboratorio" />
        </section>

        <LaboratorioSave :mostrar="mostrarLaboratorio" :laboratorio="laboratorioEdit" :modoEdicion="!!laboratorioEdit"
            @guardar="handleGuardarLaboratorio" @close="mostrarLaboratorio = false" />
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
