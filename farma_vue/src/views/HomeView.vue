<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'

const totales = ref({
  totalMedicamentos: 0,
  totalVentas: 0,
  totalClientes: 0,
  totalProveedores: 0
})

async function obtenerTotales() {
  try {
    const response = await http.get('dashboard/totals')
    totales.value = response.data
  } catch (error) {
    console.error('Error al obtener los totales del dashboard:', error)
  }
}

onMounted(() => {
  obtenerTotales()
})
</script>

<template>
  <AdminLayout>
    <div class="page-heading">
      <div class="page-heading-copy">
        <span class="page-icon">
          <i class="bi bi-speedometer2" aria-hidden="true"></i>
        </span>
        <div>
          <p class="eyebrow mb-1">Bienvenida</p>
          <h1 class="h3 mb-1">Dashboard</h1>
          <p class="text-muted mb-0">Resumen general del sistema farmacéutico.</p>
        </div>
      </div>
    </div>

    <section class="row g-3 mt-1" aria-label="Dashboard metrics">
      <div class="col-12 col-sm-6 col-xl-3">
        <article class="metric-card metric-primary">
          <div class="metric-top">
            <span class="metric-label">Total Medicamentos</span>
            <span class="metric-icon"><i class="bi bi-capsule" aria-hidden="true"></i></span>
          </div>
          <div class="metric-value">{{ totales.totalMedicamentos }}</div>
        </article>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <article class="metric-card metric-success">
          <div class="metric-top">
            <span class="metric-label">Ventas</span>
            <span class="metric-icon"><i class="bi bi-cart-check" aria-hidden="true"></i></span>
          </div>
          <div class="metric-value">{{ totales.totalVentas }}</div>
        </article>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <article class="metric-card metric-warning">
          <div class="metric-top">
            <span class="metric-label">Clientes</span>
            <span class="metric-icon"><i class="bi bi-people" aria-hidden="true"></i></span>
          </div>
          <div class="metric-value">{{ totales.totalClientes }}</div>

        </article>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <article class="metric-card metric-danger">
          <div class="metric-top">
            <span class="metric-label">Proveedores</span>
            <span class="metric-icon"><i class="bi bi-building" aria-hidden="true"></i></span>
          </div>
          <div class="metric-value">{{ totales.totalProveedores }}</div>

        </article>
      </div>
    </section>

    <section class="panel mt-3">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title">
            <i class="bi bi-graph-up-arrow" aria-hidden="true"></i>
            <span>Información del Sistema</span>
          </h2>
          <p class="text-muted mb-0">Estado actual de la plataforma farmacéutica.</p>
        </div>
      </div>

      <div style="padding: 1.5rem; text-align: center; color: var(--admin-muted);">
        <p style="margin: 0;">Sistema funcionando correctamente</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem;">Todos los módulos disponibles</p>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.eyebrow {
  color: var(--admin-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
