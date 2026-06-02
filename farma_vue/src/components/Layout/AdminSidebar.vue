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

const navigationItems: NavItem[] = [
  { name: 'Dashboard', icon: 'bi-speedometer2', path: '/' },
  { name: 'Usuarios', icon: 'bi-people', path: '/usuarios' },
  { name: 'Medicamentos', icon: 'bi-capsule', path: '/medicamentos' },
  { name: 'Ventas', icon: 'bi-cart-check', path: '/ventas' },
  { name: 'Clientes', icon: 'bi-person-check', path: '/clientes' },
  { name: 'Categorías', icon: 'bi-tag', path: '/about' },
  { name: 'Proveedores', icon: 'bi-building', path: '/proveedores' },
  { name: 'Lotes', icon: 'bi-boxes', path: '/lotes' },
  { name: 'Historial de Ventas', icon: 'bi-clock-history', path: '/historial-ventas' },
]

const currentRoute = computed(() => router.currentRoute.value.path)

const isActive = (path: string) => currentRoute.value === path

const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}')

const logout = () => {
  localStorage.removeItem('usuarioActual')
  emit('close')
  router.push('/login')
}
</script>

<template>
  <aside 
    class="admin-sidebar"
    :class="{ 'show': isOpen }"
    id="adminSidebar" 
    aria-label="Main navigation"
  >
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
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        class="nav-link"
        :class="{ 'active': isActive(item.path) }"
        :to="item.path"
        :aria-current="isActive(item.path) ? 'page' : undefined"
        @click="emit('close')"
      >
        <span class="nav-icon">
          <i :class="`bi ${item.icon}`" aria-hidden="true"></i>
        </span>
        <span class="nav-text">{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="sidebar-user">
      <img 
        class="avatar-img avatar-md sidebar-user-avatar" 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" 
        alt="Admin"
      >
      <strong>Bienvenido: {{ usuarioActual.nombre }} {{ usuarioActual.apellido }}</strong>      
      <button 
        class="logout-btn"
        @click="logout"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
        <span>Cerrar sesión</span>
      </button>
    </div>


  </aside>
</template>

<style scoped>
.admin-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1040;
  width: var(--sidebar-width, 280px);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  background: var(--admin-sidebar, #111827);
  color: #c70c0c;
  box-shadow: 18px 0 42px #0f172a2e;
  transform: translateX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar[data-open="true"] {
    transform: translateX(0);
  }
}

.sidebar-header {
  padding: 1.35rem 1.25rem 1.15rem;
  margin-inline: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  color: #ffffff;
  text-decoration: none;
}

.brand-mark:hover,
.brand-mark:focus {
  color: #ffffff;
  opacity: 0.8;
}

.brand-icon {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  font-weight: 800;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: linear-gradient(135deg, #2563eb, #0f766e);
  color: #ffffff;
  font-size: 1.5rem;
}

.brand-copy {
  flex: 1;
  min-width: 0;
}

.brand-title {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.brand-subtitle {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0.75rem 0.5rem;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.75rem;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.nav-link.active {
  background: var(--admin-primary, #2563eb);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.nav-icon {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  font-size: 1.125rem;
  width: 20px;
  height: 20px;
}

.nav-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: auto;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  flex: 0 0 auto;
}

.sidebar-footer-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex: 0 0 auto;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  display: block;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-menu {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;

  font-weight: 600;
  line-height: 1.2;
}

.brand-subtitle {
  display: block;
  font-size: 0.75rem;
  opacity: 0.7;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.nav-link.active {
  background: #2563eb;
  color: #ffffff;
}

.nav-icon {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  font-size: 1.25rem;
  width: 24px;
  height: 24px;
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.sidebar-user strong {
  font-weight: 600;
}

.sidebar-user small {
  opacity: 0.7;
  font-size: 0.75rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem 1rem;
  margin-top: 0.5rem;
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: rgba(255, 255, 255, 0.85);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: rgba(220, 38, 38, 0.25);
  border-color: rgba(220, 38, 38, 0.5);
  color: #ffffff;
}

.logout-btn:active {
  transform: scale(0.98);
}

.avatar-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.875rem;
  opacity: 0.7;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.show {
    transform: translateX(0);
  }
}
</style>
