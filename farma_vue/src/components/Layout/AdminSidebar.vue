<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface NavItem {
  name: string
  icon: string
  path: string
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'close': []
}>()

const router = useRouter()

const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}')
const navigationItems: NavItem[] = [
  { name: 'Dashboard', icon: 'bi-speedometer2', path: '/' },

  ...(usuarioActual.rol === 'admin'
    ? [{ name: 'Usuarios', icon: 'bi-people', path: '/usuarios' }]
    : []),

  { name: 'Medicamentos', icon: 'bi-capsule', path: '/medicamentos' },
  { name: 'Ventas', icon: 'bi-cart-check', path: '/ventas' },
  { name: 'Clientes', icon: 'bi-person-check', path: '/clientes' },
  { name: 'Categorías', icon: 'bi-tag', path: '/categorias' },
  { name: 'Laboratorios', icon: 'bi-building-gear', path: '/laboratorios' },
  { name: 'Tipos de Receta', icon: 'bi-file-earmark-medical', path: '/tipo-recetas' },
  { name: 'Gestion de Medicamentos', icon: 'bi-tag', path: '/categorias' },
  { name: 'Proveedores', icon: 'bi-building', path: '/proveedores' },
  { name: 'Lotes', icon: 'bi-boxes', path: '/lotes' },
  { name: 'Historial de Ventas', icon: 'bi-clock-history', path: '/historial-ventas' },
]
const currentRoute = computed(() => router.currentRoute.value.path)

const isActive = (path: string) => currentRoute.value === path



const logout = () => {
  localStorage.removeItem('usuarioActual')
  emit('close')
  router.push('/login')
}
</script>

<template>
  <aside class="admin-sidebar" :class="{ 'show': isOpen }" id="adminSidebar" aria-label="Main navigation">
    <div class="sidebar-header">
      <router-link class="brand-mark" to="/" aria-label="Farmacia dashboard">
        <span class="brand-icon">
          <i class="bi bi-capsule" aria-hidden="true"></i>
        </span>
        <span class="brand-copy">
          <span class="brand-title">Farma</span>
          <span class="brand-subtitle">Sistema Farmacéutico</span>
        </span>
      </router-link>
    </div>

    <nav class="sidebar-nav">
      <router-link v-for="item in navigationItems" :key="item.path" class="nav-link"
        :class="{ 'active': isActive(item.path) }" :to="item.path"
        :aria-current="isActive(item.path) ? 'page' : undefined" @click="emit('close')">
        <span class="nav-icon">
          <i :class="`bi ${item.icon}`" aria-hidden="true"></i>
        </span>
        <span class="nav-text">{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="sidebar-user">
      <img class="avatar-img avatar-md sidebar-user-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
        alt="Admin">
      <strong>Bienvenido: {{ usuarioActual.nombre }} {{ usuarioActual.apellido }}</strong>
      <button class="btn btn-primary btn-sm" @click="logout" aria-label="Cerrar sesión" title="Cerrar sesión">
        <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
        Cerrar sesión
      </button>
    </div>


  </aside>
</template>

<style scoped></style>
