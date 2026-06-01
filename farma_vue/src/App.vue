<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const usuarioActual = ref<any>(null)

// Cargar usuario del localStorage cuando el componente se monta
const loadUsuario = () => {
  const stored = localStorage.getItem('usuarioActual')
  if (stored) {
    usuarioActual.value = JSON.parse(stored)
  } else {
    usuarioActual.value = null
  }
}

// Observar cambios en la ruta para actualizar el usuario
watch(() => route.path, loadUsuario, { immediate: true })

const logout = () => {
  localStorage.removeItem('usuarioActual')
  usuarioActual.value = null
  router.push('/login')
}
</script>

<template>
  <header v-if="route.name !== 'login'">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/medicamentos">Medicamentos</RouterLink>
        <RouterLink to="/proveedores">Proveedores</RouterLink>
        <RouterLink to="/usuarios">Usuarios</RouterLink>
        <RouterLink to="/clientes">Clientes</RouterLink>
        <RouterLink to="/lotes">Lotes</RouterLink>
        <RouterLink to="/categorias">Categorias</RouterLink>
        <RouterLink to="/ventas">Ventas</RouterLink>
        <RouterLink to="/historial-ventas">Historial Ventas</RouterLink>
      </nav>

      <div class="user-info" v-if="usuarioActual">
        <span>{{ usuarioActual.nombre }} {{ usuarioActual.apellido }}</span>
        <button @click="logout" class="logout-btn">Cerrar sesión</button>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  font-size: 0.9rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #5568d3;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  .user-info {
    margin-top: 0;
  }
}
</style>
