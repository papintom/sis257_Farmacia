<script setup lang="ts">
import AdminLayout from '@/components/Layout/AdminLayout.vue'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'


const stockBajo = ref<any[]>([])
const proximosVencer = ref<any[]>([])

async function obtenerStockBajo() {
  try {
    const response = await http.get('dashboard/stock-bajo')
    stockBajo.value = response.data
  } catch (error) {
    console.error(error)
  }
}

async function obtenerProximosVencer() {
  try {
    const response = await http.get('dashboard/proximos-vencer')
    proximosVencer.value = response.data
  } catch (error) {
    console.error(error)
  }
}
const lotesVencidos = ref<any[]>([])

async function obtenerLotesVencidos() {
  try {
    const response = await http.get('dashboard/lotes-vencidos')
    lotesVencidos.value = response.data
  } catch (error) {
    console.error(error)
  }
}

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
  obtenerStockBajo()
  obtenerProximosVencer()
  obtenerLotesVencidos()
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

    <section class="row mt-3">
      <div class="col-md-6">
        <div class="panel">
          <div class="panel-header">
            <h2 class="h5 mb-0">
              <i class="bi bi-exclamation-triangle-fill"></i>
              Stock Bajo
            </h2>
          </div>

          <div class="p-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="lote in stockBajo" :key="lote.id">
                  <td>{{ lote.medicamento.nombre }}</td>
                  <td>{{ lote.stock }}</td>
                </tr>

                <tr v-if="stockBajo.length === 0">
                  <td colspan="2" class="text-center">
                    Sin registros
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="panel">
          <div class="panel-header">
            <h2 class="h5 mb-0">
              <i class="bi bi-calendar-x"></i>
              Próximos Vencimientos
            </h2>
          </div>

          <div class="p-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Lote</th>
                  <th>Vencimiento</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="lote in proximosVencer" :key="lote.id">
                  <td>{{ lote.medicamento.nombre }}</td>
                  <td>{{ lote.codigoLote }}</td>
                  <td>{{ new Date(lote.fechaVencimiento).toLocaleDateString() }}</td>
                  <td>{{ lote.stock }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <section class="panel mt-3">
      <div class="panel-header">
        <h2 class="h5 mb-0">
          <i class="bi bi-x-circle-fill"></i>
          Medicamentos Vencidos
        </h2>
      </div>

      <div class="p-3">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Lote</th>
              <th>Fecha Vencimiento</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="lote in lotesVencidos" :key="lote.id">
              <td>{{ lote.medicamento.nombre }}</td>
              <td>{{ lote.id }}</td>
              <td>
                {{ new Date(lote.fechaVencimiento).toLocaleDateString() }}
              </td>
              <td>{{ lote.stock }}</td>
            </tr>

            <tr v-if="lotesVencidos.length === 0">
              <td colspan="4" class="text-center">
                No existen medicamentos vencidos
              </td>
            </tr>
          </tbody>
        </table>
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
