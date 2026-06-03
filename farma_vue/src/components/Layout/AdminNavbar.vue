<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import '@/assets/js/bootstrap.bundle.min.js'
import '@/assets/js/main.js'

defineEmits<{
  'toggle-sidebar': []
}>()

const router = useRouter()
const usuarioActual = ref<any>(null)
const searchQuery = ref('')

const notifications = ref([
  { id: 1, title: 'Nuevo usuario registrado', time: 'hace 4 minutos' },
  { id: 2, title: 'Medicamento bajo en stock', time: 'hace 32 minutos' },
  { id: 3, title: 'Compra completada', time: 'hace 1 hora' },
])

onMounted(() => {
  const stored = localStorage.getItem('usuarioActual')
  if (stored) {
    usuarioActual.value = JSON.parse(stored)
  }
})

const handleLogout = () => {
  localStorage.removeItem('usuarioActual')
  usuarioActual.value = null
  router.push('/login')
}

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <nav class="navbar admin-navbar navbar-expand bg-white">
    <div class="container-fluid px-3 px-lg-4">
    <!--   <button class="sidebar-toggle" type="button" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">
        <span></span>
        <span></span>
        <span></span>
      </button> -->
     <!--  BARRA DE BUSQUEDA -->
    <!--   <form class="d-none d-md-flex ms-3 flex-grow-1" role="search" @submit.prevent>
        <input v-model="searchQuery" class="form-control search-input" type="search" 
          placeholder="Buscar usuarios, medicamentos, ventas..." aria-label="Search" />
      </form> -->

      <div class="navbar-actions ms-auto">
        <!-- Theme Toggle -->
        <button class="icon-button theme-toggle" type="button" @click="toggleTheme"
          :title="`Cambiar a tema ${isDarkMode ? 'claro' : 'oscuro'}`" aria-label="Toggle color theme">
          <i :class="isDarkMode ? 'bi bi-sun' : 'bi bi-moon-stars'" aria-hidden="true"></i>
        </button>

        <!-- Notifications -->
        <div class="dropdown">
          <button class="icon-button" type="button" data-bs-toggle="dropdown" aria-expanded="false"
            aria-label="Notifications">
            <span class="notification-dot"></span>
            <i class="bi bi-bell" aria-hidden="true"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-end notification-menu">
            <div class="dropdown-header fw-bold text-body">Notificaciones</div>
            <a v-for="notif in notifications" :key="notif.id" href="#" class="dropdown-item">
              <span class="notification-title">{{ notif.title }}</span>
              <span class="notification-time">{{ notif.time }}</span>
            </a>
          </div>
        </div>

        <!-- Profile Dropdown -->
        <div class="dropdown">
          <button class="profile-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img class="avatar-img avatar-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
            <span class="profile-name d-none d-sm-inline">
              {{ usuarioActual ? `${usuarioActual.nombre} ${usuarioActual.apellido}` : 'Cargando...' }}
            </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#profile">Perfil</a></li>
            <li><a class="dropdown-item" href="#settings">Configuración</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li class="px-2 pb-2">
              <button class="btn btn-primary btn-sm w-100" @click="handleLogout">
                <i class="bi bi-box-arrow-right"></i>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* .admin-navbar {
  background: var(--admin-surface, #ffffff);
  border-bottom: 1px solid var(--admin-border, #dbe4ef);
  box-shadow: var(--admin-shadow-sm, 0 10px 24px rgba(15, 23, 42, 0.06));
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
} */
@import '@/assets/css/bootstrap.min.css';
@import '@/assets/vendors/bootstrap-icons/bootstrap-icons.css';
@import '@/assets/css/style.css';
</style>
