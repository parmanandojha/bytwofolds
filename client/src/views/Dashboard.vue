<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <!-- Header Section -->
    <section class="relative py-8 sm:py-12 md:py-16 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div>
            <div class="mb-3 sm:mb-4">
              <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">Dashboard</span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2 sm:mb-3 leading-tight">
              Submissions<br class="hidden sm:block" />
              <span class="font-normal">Dashboard</span>
            </h1>
            <p class="text-base sm:text-lg text-gray-600 font-light mt-4">Welcome back, {{ username }}</p>
          </div>
          <button
            @click="handleLogout"
            class="group inline-flex items-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
          >
            <span>Logout</span>
            <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="relative py-8 sm:py-12 md:py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div v-if="loading" class="text-center py-12 sm:py-16 md:py-20">
          <p class="text-base sm:text-lg text-gray-600 font-light">Loading submissions...</p>
        </div>

        <div v-else-if="submissions.length === 0" class="text-center py-12 sm:py-16 md:py-20">
          <div class="mb-6">
            <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-base sm:text-lg text-gray-600 font-light">No submissions yet.</p>
        </div>

        <div v-else class="space-y-8 sm:space-y-10 md:space-y-12">
          <div
            v-for="submission in submissions"
            :key="submission.id"
            class="border-t border-gray-200 pt-6 sm:pt-8 md:pt-10"
          >
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <div class="flex-1">
                <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-2">
                  Submission #{{ submission.id }}
                </h3>
                <span class="text-xs sm:text-sm text-gray-500 font-light uppercase tracking-wider">
                  {{ formatDate(submission.createdAt) }}
                </span>
              </div>
              <button
                @click="handleDelete(submission.id)"
                :disabled="deleting === submission.id"
                class="group inline-flex items-center gap-2 border border-gray-300 hover:border-red-600 hover:bg-red-50 text-gray-600 hover:text-red-600 font-normal px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg v-if="deleting !== submission.id" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                </svg>
                <span v-if="deleting !== submission.id">Delete</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </span>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div 
                v-for="[fieldKey, fieldValue] in getFilteredFields(submission)" 
                :key="`${submission.id}-${fieldKey}`" 
                class="break-words"
              >
                <div class="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest mb-2 sm:mb-3">
                  {{ formatKey(fieldKey) }}
                </div>
                <div class="text-base sm:text-lg text-gray-900 font-light leading-relaxed">
                  {{ formatValue(fieldKey, fieldValue) || '—' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submissions = ref([])
const loading = ref(true)
const deleting = ref(null)
const username = ref(localStorage.getItem('username') || 'Admin')

// Helper function to get filtered fields from a submission
const getFilteredFields = (submission) => {
  return Object.entries(submission).filter(([k]) => k !== 'id' && k !== 'createdAt')
}

const API_URL = 'http://localhost:5001/api'

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('username')
  router.push('/login')
}

const fetchSubmissions = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_URL}/submissions`)
    const data = await response.json()
    submissions.value = data.reverse()
  } catch (error) {
    console.error('Error fetching submissions:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatKey = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

const formatValue = (key, value) => {
  if (!value) return null
  
  if (key === 'websiteOption') {
    // Map the stored values to display labels
    if (value === 'have') {
      return 'Complete Website Redesign'
    } else if (value === 'need') {
      return 'Starting from Scratch'
    }
  }
  
  if (key === 'budget' && value) {
    return `₹${new Intl.NumberFormat('en-IN').format(value)}`
  }
  
  return value
}

const handleDelete = async (submissionId) => {
  if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
    return
  }

  try {
    deleting.value = submissionId
    
    console.log('Attempting to delete submission:', submissionId)
    
    const response = await fetch(`${API_URL}/submissions/${submissionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Delete response status:', response.status)

    if (!response.ok) {
      let errorMessage = 'Unknown error'
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || `Server error: ${response.status}`
      } catch (e) {
        const text = await response.text()
        errorMessage = text || `Failed to delete: ${response.status} ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    const result = await response.json().catch(() => ({ success: true }))
    console.log('Delete successful:', result)

    // Remove from local state
    submissions.value = submissions.value.filter(sub => sub.id !== submissionId)
  } catch (error) {
    console.error('Error deleting submission:', error)
    alert(`Failed to delete submission: ${error.message || 'Please try again.'}\n\nMake sure the backend server is running on port 5001.`)
  } finally {
    deleting.value = null
  }
}

onMounted(() => {
  fetchSubmissions()
})
</script>

<style scoped>
/* Hide scrollbar but allow scrolling */
div {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for webkit browsers (Chrome, Safari, Edge) */
div::-webkit-scrollbar {
  display: none;
}
</style>
