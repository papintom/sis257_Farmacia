<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import VentaList from '@/components/venta/VentaList.vue'
</script>

<template>
    <AdminLayout>
        <div class="page-heading">
            <div class="page-heading-copy">
                <span class="page-icon">
                    <i class="bi bi-clock-history" aria-hidden="true"></i>
                </span>
                <div>
                    <p class="eyebrow mb-1">Reportes</p>
                    <h1 class="h3 mb-1">Historial de Ventas</h1>
                    <p class="text-muted mb-0">Revisa el historial completo de transacciones y ventas realizadas.</p>
                </div>
            </div>
        </div>

        <section class="panel mt-3">
            <div class="panel-header">
                <div>
                    <h2 class="h5 mb-1 section-title">
                        <i class="bi bi-table" aria-hidden="true"></i>
                        <span>Listado de Ventas</span>
                    </h2>
                    <p class="text-muted mb-0">Detalle de todas las ventas registradas en el sistema.</p>
                </div>
            </div>

            <VentaList />
        </section>
    </AdminLayout>
</template>

<style scoped></style>