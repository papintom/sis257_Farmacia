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
    <div v-if="sidebarOpen" class="sidebar-backdrop" @click="closeSidebar"></div>

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

<style scoped></style>
