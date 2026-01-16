<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow p-6 sm:p-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Login</h1>
        <p class="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">Access the dashboard</p>
        
        <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6">
          <div>
            <label for="username" class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="username"
              v-model="username"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label for="password" class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter password"
              required
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
            {{ error }}
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Default credentials (you can change these)
const ADMIN_USERNAME = 'ojha96p@gmail.com'
const ADMIN_PASSWORD = 'mayank112'

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  // Simulate login delay
  await new Promise(resolve => setTimeout(resolve, 500))

  if (username.value === ADMIN_USERNAME && password.value === ADMIN_PASSWORD) {
    // Store login state
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username.value)
    
    // Navigate to dashboard
    router.push('/dashboard')
  } else {
    error.value = 'Invalid username or password'
    loading.value = false
  }
}
</script>

<style scoped>
</style>
