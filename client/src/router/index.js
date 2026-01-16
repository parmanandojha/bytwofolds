import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Form from '../views/Form.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard to protect dashboard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  // If accessing dashboard without auth, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // If accessing root and authenticated, redirect to dashboard
  else if (to.path === '/' && isAuthenticated) {
    next('/dashboard')
  }
  // Otherwise proceed normally
  else {
    next()
  }
})

export default router
