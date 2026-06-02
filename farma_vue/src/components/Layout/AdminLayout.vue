<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminNavbar from './AdminNavbar.vue'

const sidebarOpen = ref(true)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
}
</script>

<template>
  <div class="admin-shell">
    <div 
      v-if="sidebarOpen"
      class="sidebar-backdrop" 
      @click="closeSidebar"
    ></div>

    <AdminSidebar :isOpen="sidebarOpen" @close="closeSidebar" />

    <div class="admin-main" :class="{ 'sidebar-closed': !sidebarOpen }">
      <AdminNavbar @toggle-sidebar="toggleSidebar" />

      <main class="dashboard-content">
        <div class="container-fluid px-3 px-lg-4 py-4">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-shell {
  min-height: 100vh;
  display: flex;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: var(--sidebar-width, 280px);
  transition: margin-left 0.3s ease;
  width: 0;
}

.admin-main.sidebar-closed {
  margin-left: 0;
}

.dashboard-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1035;
  display: none;
}

@media (max-width: 768px) {
  .admin-main {
    margin-left: 0;
  }

  .sidebar-backdrop {
    display: block;
  }
}
</style>
