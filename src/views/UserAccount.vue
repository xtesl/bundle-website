<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Account Information</h1>
        <p class="text-gray-600 mt-2">Manage your account details and settings</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg p-12 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading account information...</p>
      </div>

      <!-- Account Details -->
      <div v-else class="space-y-6">
        <!-- Profile Card -->
        <div class="bg-white rounded-lg overflow-hidden">
          <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="pi pi-user text-4xl text-gray-900"></i>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ userInfo.email }}</h2>
                <p class="text-sm text-gray-800 mt-1">
                  Member since {{ formatDate(userInfo.created_at) }}
                </p>
              </div>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <!-- Email -->
            <div class="border-b border-gray-200 pb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-envelope mr-2 text-gray-500"></i>
                Email Address
              </label>
              <p class="text-lg text-gray-900 font-medium">{{ userInfo.email }}</p>
            </div>

            <!-- User ID -->
            <div class="border-b border-gray-200 pb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-id-card mr-2 text-gray-500"></i>
                User ID
              </label>
              <p class="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">{{ userInfo.id }}</p>
            </div>

            <!-- Role -->
            <div class="border-b border-gray-200 pb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-shield mr-2 text-gray-500"></i>
                Account Role
              </label>
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="{
                  'bg-purple-100 text-purple-800': userInfo.role === 'admin',
                  'bg-blue-100 text-blue-800': userInfo.role === 'agent',
                  'bg-green-100 text-green-800': userInfo.role === 'regular'
                }"
              >
                <i 
                  class="pi mr-2"
                  :class="{
                    'pi-star': userInfo.role === 'admin',
                    'pi-briefcase': userInfo.role === 'agent',
                    'pi-user': userInfo.role === 'regular'
                  }"
                ></i>
                {{ userInfo.role.toUpperCase() }}
              </span>
            </div>

            <!-- Account Status -->
            <div class="border-b border-gray-200 pb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-info-circle mr-2 text-gray-500"></i>
                Account Status
              </label>
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="userInfo.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'"
              >
                <i 
                  class="pi mr-2"
                  :class="userInfo.is_active ? 'pi-check-circle' : 'pi-times-circle'"
                ></i>
                {{ userInfo.is_active ? 'ACTIVE' : 'INACTIVE' }}
              </span>
            </div>

            <!-- Created At -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-calendar mr-2 text-gray-500"></i>
                Account Created
              </label>
              <p class="text-sm text-gray-900">
                {{ formatDateTime(userInfo.created_at) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Security Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i class="pi pi-lock text-yellow-500"></i>
            Security Settings
          </h3>

          <div class="space-y-4">
            <!-- Password Section -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 mb-1">Password</h4>
                  <p class="text-sm text-gray-600">••••••••••••</p>
                </div>
                <button 
                  @click="showPasswordModal = true"
                  class="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
                >
                  <i class="pi pi-key mr-2"></i>
                  Change Password
                </button>
              </div>
            </div>

            <!-- Info Box -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex gap-3">
                <i class="pi pi-shield text-blue-600 text-lg mt-0.5"></i>
                <div class="text-sm text-blue-900">
                  <p class="font-medium mb-1">Your account is secure</p>
                  <p class="text-blue-800">We use industry-standard encryption to protect your data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <i class="pi pi-clock text-3xl text-blue-500 mb-3"></i>
            <p class="text-sm text-gray-600 mb-1">Account Age</p>
            <p class="text-xl font-bold text-gray-900">{{ getAccountAge() }} days</p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <i class="pi pi-check-circle text-3xl text-green-500 mb-3"></i>
            <p class="text-sm text-gray-600 mb-1">Status</p>
            <p class="text-xl font-bold text-gray-900">{{ userInfo.is_active ? 'Active' : 'Inactive' }}</p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <i class="pi pi-shield text-3xl text-purple-500 mb-3"></i>
            <p class="text-sm text-gray-600 mb-1">Role</p>
            <p class="text-xl font-bold text-gray-900 capitalize">{{ userInfo.role }}</p>
          </div>
        </div>
      </div>

      <!-- Password Change Modal -->
      <div 
        v-if="showPasswordModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="showPasswordModal = false"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div class="p-6 border-b">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-gray-900">Change Password</h3>
              <button 
                @click="showPasswordModal = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <i class="pi pi-times text-xl"></i>
              </button>
            </div>
          </div>

          <div class="p-6">
            <!-- Coming Soon Notice -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div class="flex gap-3">
                <i class="pi pi-exclamation-triangle text-yellow-600 text-2xl"></i>
                <div>
                  <p class="font-semibold text-yellow-900 mb-1">Feature Not Available Yet</p>
                  <p class="text-sm text-yellow-800">
                    Password reset functionality is currently under development. 
                    Please contact support if you need to reset your password.
                  </p>
                </div>
              </div>
            </div>

            <!-- Support Info -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-700 mb-2 font-medium">Need help?</p>
              <p class="text-sm text-gray-600">
                Contact our support team at 
                <a href="mailto:support@kingdomdata.com" class="text-yellow-600 hover:text-yellow-700 font-medium">
                  support@kingdomdata.com
                </a>
              </p>
            </div>
          </div>

          <div class="p-6 border-t bg-gray-50">
            <button 
              @click="showPasswordModal = false"
              class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../api/axios'

const loading = ref(true)
const showPasswordModal = ref(false)
const userInfo = ref({
  id: '',
  email: '',
  role: '',
  is_active: false,
  created_at: ''
})

const fetchUserInfo = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/users/')
    if (response.status === 200 && response.data) {
      userInfo.value = response.data
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getAccountAge = () => {
  const created = new Date(userInfo.value.created_at)
  const now = new Date()
  const diffTime = Math.abs(now - created)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

onMounted(() => {
  fetchUserInfo()
})
</script>