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
main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f8fbff 0%, #f5f7fb 42%, #eef4fa 100%);
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-card {
  background: var(--admin-surface, #ffffff);
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: var(--admin-shadow, 0 18px 46px rgba(15, 23, 42, 0.09));
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--admin-border, #dbe4ef);
}

.login-card h1 {
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: var(--admin-text, #1f2937);
  font-weight: 700;
}

.login-card > p {
  text-align: center;
  color: var(--admin-muted, #6b7280);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--admin-text, #1f2937);
  font-size: 0.875rem;
}

.form-group :deep(input),
.form-group :deep(.p-inputtext) {
  padding: 0.75rem 1rem;
  border: 1px solid var(--admin-border, #dbe4ef);
  border-radius: 8px;
  font-size: 0.95rem;
  background: var(--admin-surface-soft, #f8fafc);
  color: var(--admin-text, #1f2937);
  transition: all 0.2s ease;
}

.form-group :deep(input:focus),
.form-group :deep(.p-inputtext:focus) {
  border-color: var(--admin-primary, #2563eb);
  outline: none;
  box-shadow: var(--admin-ring, 0 0 0 4px rgba(37, 99, 235, 0.12));
  background: var(--admin-surface, #ffffff);
}

.form-group :deep(input:disabled),
.form-group :deep(.p-inputtext:disabled) {
  background-color: var(--admin-surface-soft, #f8fafc);
  cursor: not-allowed;
  opacity: 0.6;
}

:deep(.p-button) {
  margin-top: 1rem;
  padding: 0.75rem 1rem !important;
  background-color: var(--admin-primary, #2563eb) !important;
  border: 1px solid var(--admin-primary, #2563eb) !important;
  font-weight: 600;
  border-radius: 8px !important;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

:deep(.p-button:hover:not(:disabled)) {
  background-color: var(--admin-primary-dark, #1d4ed8) !important;
  border-color: var(--admin-primary-dark, #1d4ed8) !important;
  transform: translateY(-2px);
  box-shadow: var(--admin-shadow-sm, 0 10px 24px rgba(15, 23, 42, 0.06));
}

:deep(.p-button:disabled) {
  background-color: var(--admin-muted, #6b7280) !important;
  border-color: var(--admin-muted, #6b7280) !important;
}

.error-message {
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: var(--admin-danger, #dc2626);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
}

.toggle-mode {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--admin-muted, #6b7280);
}

.link-button {
  background: none;
  border: none;
  color: var(--admin-primary, #2563eb);
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;
  font-weight: 600;
  padding: 0;
  transition: color 0.2s ease;
}

.link-button:hover {
  color: var(--admin-primary-dark, #1d4ed8);
  text-decoration: underline;
}

.w-full {
  width: 100%;
}

@media (max-width: 640px) {
  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-card h1 {
    font-size: 1.5rem;
  }
}
</style>
