<script setup lang="ts">
import http from '@/plugins/axios'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const correo = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const esRegistro = ref(false)
const nombre = ref('')
const apellido = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    const response = await http.get('usuarios')
    const usuarios = response.data

    const usuario = usuarios.find((u: any) => u.correo === correo.value)

    if (!usuario) {
      error.value = 'Usuario no encontrado'
      return
    }

    if (usuario.password !== password.value) {
      error.value = 'Contraseña incorrecta'
      return
    }

    localStorage.setItem('usuarioActual', JSON.stringify(usuario))
    router.push('/medicamentos')
  } catch (err: any) {
    error.value = 'Error al conectar con el servidor'
  } finally {
    loading.value = false
  }
}

async function handleRegistro() {
  loading.value = true
  error.value = ''

  try {
    if (!nombre.value || !apellido.value || !correo.value || !password.value) {
      error.value = 'Por favor completa todos los campos'
      return
    }

    const response = await http.post('usuarios', {
      nombre: nombre.value,
      apellido: apellido.value,
      correo: correo.value,
      password: password.value,
      rol: 'vendedor',
    })

    if (response.status === 201) {
      localStorage.setItem('usuarioActual', JSON.stringify(response.data))
      router.push('/medicamentos')
    }
  } catch (err: any) {
    if (err?.response?.status === 409) {
      error.value = 'El usuario ya existe'
    } else {
      error.value = err?.response?.data?.message || 'Error en el registro'
    }
  } finally {
    loading.value = false
  }
}

function toggleMode() {
  esRegistro.value = !esRegistro.value
  error.value = ''
  correo.value = ''
  password.value = ''
  nombre.value = ''
  apellido.value = ''
}
</script>

<template>
  <main>
    <div class="login-container">
      <div class="login-card">
        <h1>{{ esRegistro ? 'Registrarse' : 'Iniciar Sesión' }}</h1>

        <div v-if="error" class="error-message">{{ error }}</div>

        <form @submit.prevent="esRegistro ? handleRegistro() : handleLogin()">
          <div v-if="esRegistro" class="form-group">
            <label>Nombre</label>
            <InputText v-model="nombre" :disabled="loading" placeholder="Tu nombre" />
          </div>

          <div v-if="esRegistro" class="form-group">
            <label>Apellido</label>
            <InputText v-model="apellido" :disabled="loading" placeholder="Tu apellido" />
          </div>

          <div class="form-group">
            <label>Correo</label>
            <InputText
              v-model="correo"
              type="email"
              :disabled="loading"
              placeholder="tu@correo.com"
            />
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <InputText
              v-model="password"
              type="password"
              :disabled="loading"
              placeholder="Tu contraseña"
            />
          </div>

          <Button
            type="submit"
            :disabled="loading"
            class="w-full"
            :loading="loading"
          >
            {{ esRegistro ? 'Registrarse' : 'Ingresar' }}
          </Button>
        </form>

        <div class="toggle-mode">
          <p v-if="!esRegistro">
            ¿No tienes cuenta?
            <button type="button" @click="toggleMode" class="link-button">
              Registrarse
            </button>
          </p>
          <p v-else>
            ¿Ya tienes cuenta?
            <button type="button" @click="toggleMode" class="link-button">
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>


.login-card {
  background: black;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: hsla(160, 100%, 37%, 1);
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: hsla(160, 100%, 37%, 1);
}

.form-group :deep(input) {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group :deep(input:focus) {
  border-color: #667eea;
  outline: none;
}

.form-group :deep(input:disabled) {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

:deep(.p-button) {
  margin-top: 1rem;
  padding: 0.75rem !important;
  background-color: hsla(160, 100%, 37%, 1) !important;
  border: none !important;
  font-weight: 600;
}

:deep(.p-button:hover) {
  background-color: rgb(6, 130, 89) !important;
}

:deep(.p-button:disabled) {
  background-color: #ccc !important;
}

.error-message {
  background-color: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.toggle-mode {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.link-button {
  background: none;
  border: none;
  color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  font-weight: 600;
  padding: 0;
}

.link-button:hover {
  color: #5568d3;
}

.w-full {
  width: 100%;
}
</style>
