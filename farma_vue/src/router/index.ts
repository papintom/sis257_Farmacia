import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const isAuthenticated = (): boolean => {
  const usuario = localStorage.getItem('usuarioActual')
  return !!usuario
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/medicamentos',
      name: 'medicamentos',
      component: () => import('../views/MedicamentoView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('../views/ProveedorView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lotes',
      name: 'lotes',
      component: () => import('../views/LoteView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentaView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/historial-ventas',
      name: 'historial-ventas',
      component: () => import('../views/HistorialVentasView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/factura/:id',
      name: 'factura',
      component: () => import('../views/FacturaView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth !== false
  const isLogged = isAuthenticated()
  const isLoginRoute = to.name === 'login'

  // Si intenta ir a login y ya está logueado, redirige al home
  if (isLoginRoute && isLogged) {
    next({ name: 'home' })
    return
  }

  // Si la ruta requiere autenticación y no está logueado, redirige al login
  if (requiresAuth && !isLogged) {
    next({ name: 'login' })
    return
  }

  // Si todo está bien, continúa
  next()
})

export default router
