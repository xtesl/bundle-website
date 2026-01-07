<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Bundle Orders</h1>
            <p class="text-gray-600">Track and manage your data bundle purchases</p>
          </div>
          
          <div class="mt-4 sm:mt-0 flex items-center space-x-3">
            <button 
              @click="fetchOrders"
              :disabled="isLoading"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <i :class="isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-refresh'" class="mr-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-start">
          <i class="pi pi-info-circle text-blue-500 mt-0.5 mr-3"></i>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-blue-900 mb-1">Order Taking Too Long?</h3>
            <p class="text-sm text-blue-700">If your order is deliverd but till not received, please use the "Report Issue" button to contact support via WhatsApp.</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-search text-gray-400"></i>
              </div>
              <input 
                v-model="searchTerm"
                type="text" 
                placeholder="Search by phone number or order ID..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <select 
            v-model="statusFilter"
            class="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{{ orders.length }}</div>
          <div class="text-xs text-gray-500">Total Orders</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{{ completedCount }}</div>
          <div class="text-xs text-gray-500">Delivered</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</div>
          <div class="text-xs text-gray-500">Pending</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">GH₵{{ totalAmount }}</div>
          <div class="text-xs text-gray-500">Total Spent</div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-6 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-sm border border-red-200 p-12 text-center">
        <i class="pi pi-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Failed to load orders</h3>
        <p class="text-gray-500 mb-6">{{ error }}</p>
        <button 
          @click="fetchOrders"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Orders List -->
      <div v-else-if="filteredOrders.length > 0" class="space-y-4">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <h3 class="text-lg font-semibold text-gray-900">Order #{{ order.external_id }}</h3>
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  <i :class="order.status === 'delivered' ? 'pi pi-check' : 'pi pi-clock'" class="mr-1 text-xs"></i>
                  {{ order.status === 'delivered' ? 'Delivered' : 'Pending' }}
                </span>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <div class="flex items-center">
                  <i class="pi pi-phone mr-2 text-blue-500"></i>
                  <span>{{ formatPhone(order.beneficiary_number) }}</span>
                </div>
                <div class="flex items-center">
                  <i class="pi pi-clock mr-2 text-orange-500"></i>
                  <span>{{ formatDate(order.created_at) }}</span>
                </div>
                <div v-if="order.completed_at" class="flex items-center">
                  <i class="pi pi-check-circle mr-2 text-green-500"></i>
                  <span>{{ formatDate(order.completed_at) }}</span>
                </div>
              </div>
            </div>
            
            <div class="text-right ml-4">
              <div class="text-2xl font-bold text-gray-900">GH₵{{ order.price_paid }}</div>
            </div>
          </div>

          <!-- Progress Bar for Pending -->
          <div v-if="order.status === 'pending'" class="mb-4">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Processing...</span>
              <span>{{ getTimeSince(order.created_at) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full animate-pulse" style="width: 60%"></div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="text-xs text-gray-500">
              ID: <span class="font-mono">{{ order.id.substring(0, 8) }}...</span>
            </div>
            
            <div class="flex space-x-2">
              <a 
                v-if="order.status === 'pending'" 
                :href="getWhatsAppLink(order)"
                target="_blank"
                class="inline-flex items-center px-3 py-1 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-white hover:bg-green-50"
              >
                <i class="pi pi-whatsapp mr-1"></i>
                Report Issue
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <i class="pi pi-shopping-bag text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p class="text-gray-500">{{ searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'You haven\'t made any purchases yet' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from "../api/axios"

const orders = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchTerm = ref('')
const statusFilter = ref('all')

// Fetch orders
const fetchOrders = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await apiClient.get("/orders/me")
    
    if (response.status === 200) {
      orders.value = response.data || []
    }
  } catch (err) {
    console.error('Error fetching orders:', err)
    error.value = err.message || 'Failed to load orders'
  } finally {
    isLoading.value = false
  }
}

// Filtered orders
const filteredOrders = computed(() => {
  let filtered = orders.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.beneficiary_number.includes(term) ||
      order.external_id.includes(term) ||
      order.id.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

// Stats
const completedCount = computed(() => orders.value.filter(o => o.status === 'delivered').length)
const pendingCount = computed(() => orders.value.filter(o => o.status === 'pending').length)
const totalAmount = computed(() => 
  orders.value.reduce((sum, order) => sum + parseFloat(order.price_paid || 0), 0).toFixed(2)
)

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPhone = (phone) => {
  if (phone.startsWith('0')) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  }
  return phone
}

const getTimeSince = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 60) return `${diffMins} min ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} hr ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
}

const getWhatsAppLink = (order) => {
  const phone = "233000000000" // Replace with actual support number
  const message = encodeURIComponent(
    `Hello, I'm reporting a delayed order.\n\n` +
    `Order ID: ${order.external_id}\n` +
    `Phone: ${order.beneficiary_number}\n` +
    `Amount: GH₵${order.price_paid}\n` +
    `Time: ${formatDate(order.created_at)}\n\n` +
    `Please help resolve this issue.`
  )
  return `https://wa.me/${phone}?text=${message}`
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>