<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  'toggle-sidebar': []
}>()

const notifications = ref([
  { id: 1, title: 'Nuevo usuario registrado', time: 'hace 4 minutos' },
  { id: 2, title: 'Medicamento bajo en stock', time: 'hace 32 minutos' },
  { id: 3, title: 'Compra completada', time: 'hace 1 hora' },
])

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <nav class="navbar admin-navbar navbar-expand bg-white">
    <div class="container-fluid px-3 px-lg-4">
      <button
        class="sidebar-toggle"
        type="button"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <form class="d-none d-md-flex ms-3 flex-grow-1" role="search">
        <input
          class="form-control search-input"
          type="search"
          placeholder="Buscar usuarios, medicamentos, ventas..."
          aria-label="Search"
        />
      </form>

      <div class="navbar-actions ms-auto">
        <!-- Theme Toggle -->
        <button
          class="icon-button theme-toggle"
          type="button"
          @click="toggleTheme"
          :title="`Cambiar a tema ${isDarkMode ? 'claro' : 'oscuro'}`"
          aria-label="Toggle color theme"
        >
          <i :class="isDarkMode ? 'bi bi-sun' : 'bi bi-moon-stars'" aria-hidden="true"></i>
        </button>

        <!-- Notifications -->
        <div class="dropdown">
          <button
            class="icon-button"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Notifications"
          >
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
          <button
            class="profile-button dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              class="avatar-img avatar-sm"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Admin"
            />
            <span class="profile-name d-none d-sm-inline">Administrador</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#profile">Perfil</a></li>
            <li><a class="dropdown-item" href="#settings">Configuración</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="/login">Cerrar sesión</a></li>
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

.sidebar-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle span {
  width: 24px;
  height: 2px;
  background: var(--admin-text, #1f2937);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.sidebar-toggle:hover span {
  background: var(--admin-primary, #2563eb);
}

@media (max-width: 768px) {
  .sidebar-toggle {
    display: flex;
  }
}

.search-input {
  max-width: 400px;
  background: var(--admin-surface-soft, #f8fafc);
  border: 1px solid var(--admin-border, #dbe4ef);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

.search-input:focus {
  background: var(--admin-surface, #ffffff);
  border-color: var(--admin-primary, #2563eb);
  outline: none;
  box-shadow: var(--admin-ring, 0 0 0 4px rgba(37, 99, 235, 0.12));
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-button {
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--admin-text, #1f2937);
  font-size: 1.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.icon-button:hover {
  background: var(--admin-surface-soft, #f8fafc);
}

.notification-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: var(--admin-danger, #dc2626);
  border-radius: 50%;
  border: 2px solid var(--admin-surface, #ffffff);
}

.notification-menu {
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.notification-title {
  display: block;
  font-weight: 500;
  color: var(--admin-text, #1f2937);
}

.notification-time {
  display: block;
  font-size: 0.75rem;
  color: var(--admin-muted, #6b7280);
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--admin-text, #1f2937);
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.profile-button:hover {
  background: var(--admin-surface-soft, #f3f5f8);
}

.avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-sm {
  width: 32px;
  height: 32px;
}

.profile-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.dropdown-menu {
  border: 1px solid var(--admin-border, #dbe4ef);
  border-radius: 8px;
  box-shadow: var(--admin-shadow, 0 18px 46px rgba(15, 23, 42, 0.09));
  background: var(--admin-surface, #ffffff);
}

.dropdown-item {
  padding: 0.75rem 1rem;
  color: var(--admin-text, #1f2937);
  text-decoration: none;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: var(--admin-surface-soft, #f8fafc);
  color: var(--admin-primary, #2563eb);
}

.dropdown-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--admin-border, #dbe4ef);
}
</style>
