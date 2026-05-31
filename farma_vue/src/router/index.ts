import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/medicamentos',
      name: 'medicamentos',
      component: () => import('../views/MedicamentoView.vue'),
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('../views/ProveedorView.vue'),
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue'),
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
    },
    {
      path: '/lotes',
      name: 'lotes',
      component: () => import('../views/LoteView.vue'),
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentaView.vue'),
    },
    {
      path: '/historial-ventas',
      name: 'historial-ventas',
      component: () => import('../views/HistorialVentasView.vue'),
    },
    {
      path: '/factura/:id',
      name: 'factura',
      component: () => import('../views/FacturaView.vue'),
    },
  ],
})

export default router
