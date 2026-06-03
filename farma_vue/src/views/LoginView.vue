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

// Nueva variable para el modo oscuro
const isDarkMode = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    const response = await http.post('auth/login', {
      correo: correo.value,
      password: password.value,
    })

    const data = response.data

    localStorage.setItem('usuarioActual', JSON.stringify(data))
    router.push('/medicamentos')

  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Credenciales incorrectas'
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

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <main class="pharma-bg" :class="{ 'dark-mode': isDarkMode }" role="main" aria-label="Portal de Farmacia">

    <!-- Botón de Tema (Modo Claro / Oscuro) -->
    <button @click="toggleTheme" class="theme-toggle"
      :aria-label="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
      <svg v-if="!isDarkMode" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2"
        fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>

    <!-- Formas de fondo suaves -->
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <div class="content-wrapper">
      <!-- Header visual (Cruz Médica Moderna) -->
      <div class="header-visual">
        <div class="pharma-cross">
          <div class="cross-h"></div>
          <div class="cross-v"></div>
        </div>
      </div>

      <!-- Title -->
      <div class="pharma-title">FarmaSalud</div>
      <div class="pharma-sub">Portal de Atención y Dispensación</div>

      <!-- Auth card -->
      <div class="auth-container">
        <h1 class="form-title">{{ esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h1>

        <div v-if="error" class="error-message">{{ error }}</div>

        <form @submit.prevent="esRegistro ? handleRegistro() : handleLogin()">

          <Transition name="slide-down">
            <div v-if="esRegistro" class="form-group">
              <label>Nombre</label>
              <InputText v-model="nombre" :disabled="loading" placeholder="Ej. Juan" />
            </div>
          </Transition>

          <Transition name="slide-down">
            <div v-if="esRegistro" class="form-group">
              <label>Apellido</label>
              <InputText v-model="apellido" :disabled="loading" placeholder="Ej. Pérez" />
            </div>
          </Transition>

          <div class="form-group">
            <label>Correo Electrónico</label>
            <InputText v-model="correo" type="email" :disabled="loading" placeholder="usuario@farmacia.com" />
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <InputText v-model="password" type="password" :disabled="loading" placeholder="••••••••" />
          </div>

          <Button type="submit" :disabled="loading" :loading="loading" class="auth-btn w-full"
            :class="{ 'btn-secondary': esRegistro }">
            {{ esRegistro ? 'Registrarse' : 'Ingresar' }}
          </Button>
        </form>

        <div class="auth-link">
          <button type="button" @click="toggleMode" class="link-button">
            {{ esRegistro ? '¿Ya tienes cuenta? Iniciar sesión' : '¿Eres nuevo? Regístrate aquí' }}
          </button>
        </div>
      </div>

      <!-- Pills -->
      <div class="pills">
        <span class="pill">⚕️ Salud Integral</span>
        <span class="pill pill-blue">✓ Medicamentos Certificados</span>
        <span class="pill">⏱️ Atención 24/7</span>
      </div>

      <div class="tagline">Cuidando tu salud, cerca de ti.</div>
    </div>
  </main>
</template>

<style scoped>
/* ─── Variables CSS (Claro y Oscuro) ───────────────────────── */
.pharma-bg {
  /* Variables Modo Claro */
  --bg-start: #f0f7fb;
  --bg-end: #e0f2f1;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --input-bg: #f8fafc;
  --input-border: #cbd5e1;
  --input-focus: #ffffff;
  --cross-bg: #ffffff;
  --pill-bg: #ffffff;
  --pill-border: #e2e8f0;
  --pill-blue-bg: #f0f9ff;
  --pill-blue-border: #bae6fd;
  --pill-blue-text: #0284c7;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%);
  color: var(--text-main);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  transition: background 0.4s ease, color 0.4s ease;
}

/* Variables Modo Oscuro */
.pharma-bg.dark-mode {
  --bg-start: #0f172a;
  --bg-end: #020617;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --card-bg: #1e293b;
  --card-border: #334155;
  --input-bg: #0f172a;
  --input-border: #475569;
  --input-focus: #1e293b;
  --cross-bg: #1e293b;
  --pill-bg: #1e293b;
  --pill-border: #334155;
  --pill-blue-bg: #0c4a6e;
  --pill-blue-border: #0369a1;
  --pill-blue-text: #38bdf8;
}

/* ─── Botón Flotante de Tema ───────────────────────────────── */
.theme-toggle {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 20;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text-main);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.15);
}

/* ─── Base y Contenedor ────────────────────────────────────── */
.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ─── Formas de Fondo Decorativas ──────────────────────────── */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  transition: background 0.4s ease;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: rgba(46, 196, 182, 0.2);
  top: -100px;
  left: -100px;
  animation: float-slow 8s ease-in-out infinite alternate;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: rgba(33, 150, 243, 0.15);
  bottom: -150px;
  right: -100px;
  animation: float-slow 10s ease-in-out infinite alternate-reverse;
}

.dark-mode .shape-1 {
  background: rgba(46, 196, 182, 0.08);
}

.dark-mode .shape-2 {
  background: rgba(33, 150, 243, 0.05);
}

@keyframes float-slow {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(30px, 40px);
  }
}

/* ─── Cruz Médica ──────────────────────────────────────────── */
.header-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.pharma-cross {
  position: relative;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cross-bg);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(46, 196, 182, 0.2);
  transition: background 0.4s ease;
}

.cross-h,
.cross-v {
  position: absolute;
  background: #2ec4b6;
  border-radius: 4px;
}

.cross-h {
  width: 32px;
  height: 10px;
}

.cross-v {
  width: 10px;
  height: 32px;
}

/* ─── Títulos ──────────────────────────────────────────────── */
.pharma-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.5px;
  text-align: center;
  margin-bottom: 4px;
  transition: color 0.4s ease;
}

.pharma-sub {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.4s ease;
}

/* ─── Contenedor del Formulario ────────────────────────────── */
.auth-container {
  width: 100%;
  max-width: 380px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.form-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 1.5rem 0;
  transition: color 0.4s ease;
}

/* ─── Grupos de Formulario ─────────────────────────────────── */
.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: block;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
  font-weight: 600;
  transition: color 0.4s ease;
}

/* InputText de PrimeVue adaptado */
.form-group :deep(input),
.form-group :deep(.p-inputtext) {
  width: 100%;
  background: var(--input-bg) !important;
  border: 1px solid var(--input-border) !important;
  color: var(--text-main) !important;
  padding: 12px 14px !important;
  border-radius: 8px !important;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease !important;
}

.form-group :deep(input::placeholder),
.form-group :deep(.p-inputtext::placeholder) {
  color: #94a3b8;
}

.form-group :deep(input:focus),
.form-group :deep(.p-inputtext:focus) {
  border-color: #2ec4b6 !important;
  box-shadow: 0 0 0 3px rgba(46, 196, 182, 0.15) !important;
  background: var(--input-focus) !important;
}

.form-group :deep(input:disabled),
.form-group :deep(.p-inputtext:disabled) {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ─── Botones ──────────────────────────────────────────────── */
.auth-btn :deep(.p-button),
:deep(.auth-btn.p-button) {
  width: 100%;
  background: #2ec4b6 !important;
  color: #fff !important;
  border: none !important;
  padding: 14px !important;
  border-radius: 8px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: all 0.2s ease !important;
  margin-top: 10px;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(46, 196, 182, 0.2);
}

:deep(.auth-btn.p-button:hover:not(:disabled)) {
  background: #25a195 !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(46, 196, 182, 0.3);
}

:deep(.auth-btn.btn-secondary.p-button) {
  background: #3b82f6 !important;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
}

:deep(.auth-btn.btn-secondary.p-button:hover:not(:disabled)) {
  background: #2563eb !important;
  box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.3);
}

:deep(.auth-btn.p-button:disabled) {
  opacity: 0.6 !important;
  cursor: not-allowed;
  transform: none !important;
}

.w-full {
  width: 100%;
}

/* ─── Mensajes de Error ────────────────────────────────────── */
.error-message {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #ef4444;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
}

.dark-mode .error-message {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

/* ─── Toggle link ──────────────────────────────────────────── */
.auth-link {
  text-align: center;
  margin-top: 1.25rem;
}

.link-button {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  transition: color 0.2s ease;
}

.link-button:hover {
  color: #2ec4b6;
  text-decoration: underline;
}

/* ─── Píldoras de Información (Pills) ──────────────────────── */
.pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: var(--pill-bg);
  border: 1px solid var(--pill-border);
  color: var(--text-muted);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.4s ease;
}

.pill-blue {
  color: var(--pill-blue-text);
  background: var(--pill-blue-bg);
  border-color: var(--pill-blue-border);
}

/* ─── Tagline ──────────────────────────────────────────────── */
.tagline {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  transition: color 0.4s ease;
}

/* ─── Animación Slide-down ─────────────────────────────────── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 100px;
  margin-bottom: 1.25rem;
}

/* ─── Responsive ───────────────────────────────────────────── */
@media (max-width: 640px) {
  .auth-container {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .pharma-title {
    font-size: 22px;
  }

  .theme-toggle {
    top: 1rem;
    right: 1rem;
    width: 38px;
    height: 38px;
  }
}
</style>