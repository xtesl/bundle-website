import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import UserDashboard from '../views/UserDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
     path: '/transactions',
     name: 'transactions',
     component: () => import('../views/Transactions.vue'),
     meta: { requiresAuth: true }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/storefront/:slug',
    name: 'storefront',
    component: () => import('../views/AgentStoreFront.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/account',
    name: 'account',
    component: () => import('../views/UserAccount.vue'),
    meta: { requiresAuth: true, allowAdmin: true }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/auth/register-agent',
    component: () => import('../views/AgentRegistration.vue'),
    name: 'register-agent',
    meta: { requiresAuth: true }
  },
  {
    path: '/user/orders',
    component: () => import('../views/Orders.vue'),
    name: 'orders',
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth state if not already done
  if (!authStore.isInitialized) {
    await authStore.fetchUserType()
  }

  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest
  const requiresRole = to.meta.requiresRole
  const allowAdmin = to.meta.allowAdmin

  // Redirect to login if route requires authentication and user is not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // Redirect to home if route requires guest and user is authenticated
  if (requiresGuest && authStore.isAuthenticated) {
    // If admin trying to access guest pages, send to admin dashboard
    if (authStore.userType === 'admin') {
      return next({ name: 'AdminDashboard' })
    }
    return next({ name: 'home' })
  }

  // Check role-based access
  if (requiresRole && authStore.userType !== requiresRole) {
    return next({ name: 'home' })
  }

  // Admin restrictions: only allow dashboard and account pages
  if (authStore.userType === 'admin') {
    const allowedAdminRoutes = ['AdminDashboard', 'account', 'login', 'register']
    
    if (!allowedAdminRoutes.includes(to.name)) {
      return next({ name: 'AdminDashboard' })
    }
  }

  next()
})

export default router