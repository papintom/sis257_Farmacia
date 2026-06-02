<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
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
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
