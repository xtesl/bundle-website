<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Bundle Orders</h1>
            <p class="text-gray-600">Track and manage all your data bundle purchases</p>
          </div>
          
          <div class="mt-4 sm:mt-0 flex items-center space-x-3">
            <button 
              @click="refreshOrders"
              :disabled="refreshing"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <i :class="refreshing ? 'pi pi-spinner pi-spin' : 'pi pi-refresh'" class="mr-2"></i>
              {{ refreshing ? 'Refreshing...' : 'Refresh' }}
            </button>
            <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <i class="pi pi-download mr-2"></i>
              Export
            </button>
            <div class="bg-white px-3 py-2 rounded-lg border border-gray-200">
              <span class="text-sm text-gray-500">Total Orders: </span>
              <span class="font-semibold text-gray-900">{{ filteredOrders.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="p-4 border-b border-gray-200">
          <div class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            
            <!-- Search -->
            <div class="flex-1">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="pi pi-search text-gray-400"></i>
                </div>
                <input 
                  v-model="searchTerm"
                  type="text" 
                  placeholder="Search by beneficiary number or plan name..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <!-- Status Filter -->
            <div class="relative">
              <select 
                v-model="statusFilter"
                class="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i class="pi pi-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>

            <!-- Sort By -->
            <div class="relative">
              <select 
                v-model="sortBy"
                class="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_high">Amount: High to Low</option>
                <option value="amount_low">Amount: Low to High</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i class="pi pi-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Stats -->
        <div class="p-4 bg-gray-50">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ totalOrders }}</div>
              <div class="text-xs text-gray-500">Total Orders</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ completedOrders }}</div>
              <div class="text-xs text-gray-500">Completed</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-600">{{ pendingOrders }}</div>
              <div class="text-xs text-gray-500">Pending</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">GH₵{{ totalAmount.toFixed(2) }}</div>
              <div class="text-xs text-gray-500">Total Amount</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-4 border-b border-gray-200">
            <div class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div class="flex-1">
                <div class="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div class="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div class="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div class="p-4 bg-gray-50">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div v-for="i in 4" :key="i" class="text-center">
                <div class="h-8 w-16 mx-auto mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Cards -->
        <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="j in 4" :key="j" class="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div class="ml-4">
                <div class="h-8 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div class="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div class="flex space-x-2">
                <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-sm border border-red-200 p-12 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <i class="pi pi-exclamation-triangle text-2xl text-red-500"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Failed to load orders</h3>
        <p class="text-gray-500 mb-6">{{ error }}</p>
        <button 
          @click="fetchOrders()"
          class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700"
        >
          <i class="pi pi-refresh mr-2"></i>
          Try Again
        </button>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-4">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
        >
          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              
              <!-- Order Info -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center space-x-3 mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">{{ order.plan.name }}</h3>
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="order.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'"
                      >
                        <i :class="order.completed ? 'pi pi-check' : 'pi pi-clock'" class="mr-1 text-xs"></i>
                        {{ order.completed ? 'Completed' : 'Pending' }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div class="flex items-center text-gray-600">
                        <i class="pi pi-phone mr-2 text-blue-500"></i>
                        <span>{{ formatPhoneNumber(order.beneficiary_number) }}</span>
                      </div>
                      <div class="flex items-center text-gray-600">
                        <i class="pi pi-calendar mr-2 text-purple-500"></i>
                        <span>{{ order.plan.duration }}</span>
                      </div>
                      <div class="flex items-center text-gray-600">
                        <i class="pi pi-clock mr-2 text-orange-500"></i>
                        <span>{{ formatDate(order.created_at) }}</span>
                      </div>
                      <div v-if="order.completed && order.completed_at" class="flex items-center text-gray-600">
                        <i class="pi pi-check-circle mr-2 text-green-500"></i>
                        <span>{{ formatDate(order.completed_at) }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Order Amount -->
                  <div class="text-right ml-4">
                    <div class="text-2xl font-bold text-gray-900">GH₵{{ order.plan.price.toFixed(2) }}</div>
                    <div class="text-xs text-gray-500">{{ order.plan.value }}</div>
                  </div>
                </div>

                <!-- Progress Bar (for pending orders) -->
                <div v-if="!order.completed" class="mt-4">
                  <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Processing order...</span>
                    <span>{{ getTimeSinceOrder(order.created_at) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full animate-pulse" style="width: 60%"></div>
                  </div>
                </div>

                <!-- Order Actions -->
                <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div class="text-xs text-gray-500">
                    Order ID: <span class="font-mono">{{ order.id }}</span>
                  </div>
                  
                  <div class="flex space-x-2">
                    <button class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <i class="pi pi-eye mr-1"></i>
                      Details
                    </button>
                    <button v-if="!order.completed" class="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-white hover:bg-red-50">
                      <i class="pi pi-times mr-1"></i>
                      Cancel
                    </button>
                    <button v-else class="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-white hover:bg-blue-50">
                      <i class="pi pi-refresh mr-1"></i>
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && !error && filteredOrders.length === 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="pi pi-shopping-bag text-2xl text-gray-400"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p class="text-gray-500 mb-6">{{ searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'You haven\'t made any bundle purchases yet' }}</p>
          <button class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700">
            <i class="pi pi-plus mr-2"></i>
            Buy Bundle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from "../api/axios"

// API and loading states
const orders = ref([])
const isLoading = ref(true)
const error = ref(null)
const refreshing = ref(false)

// Filter states
const searchTerm = ref('')
const statusFilter = ref('all')
const sortBy = ref('newest')


// API Functions
const fetchOrders = async (showRefreshSpinner = false) => {
  try {
    if (showRefreshSpinner) {
      refreshing.value = true
    } else {
      isLoading.value = true
    }
    error.value = null

     const response = await apiClient.get("/orders/me")

    if (response.status == 200) {
      orders.value = response.data || []
    }

    
  } catch (err) {
    console.error('Error fetching orders:', err)
    error.value = err.message || 'Failed to load orders'
    
    // Optional: Show some sample data in development
    if (process.env.NODE_ENV === 'development') {
      orders.value = getSampleData()
    }
  } finally {
    isLoading.value = false
    refreshing.value = false
  }
}

// Sample data fallback for development
const getSampleData = () => [
  {
    id: "ORD-001",
    beneficiary_number: "+233501234567",
    completed: true,
    plan: { 
      name: "MTN 5GB Bundle", 
      price: 25.00, 
      value: "5GB",
      duration: "30 days" 
    },
    created_at: "2024-12-15T10:30:00Z",
    completed_at: "2024-12-15T10:32:00Z"
  },
  {
    id: "ORD-002",
    beneficiary_number: "+233507654321",
    completed: false,
    plan: { 
      name: "Vodafone 10GB Bundle", 
      price: 45.00, 
      value: "10GB",
      duration: "30 days" 
    },
    created_at: "2024-12-15T11:15:00Z",
    completed_at: null
  },
  {
    id: "ORD-003",
    beneficiary_number: "+233551234567",
    completed: true,
    plan: { 
      name: "AirtelTigo 2GB Bundle", 
      price: 12.00, 
      value: "2GB",
      duration: "7 days" 
    },
    created_at: "2024-12-15T09:45:00Z",
    completed_at: "2024-12-15T09:47:00Z"
  }
]

// Refresh function
const refreshOrders = () => {
  fetchOrders(true)
}

// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value

  // Search filter
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.beneficiary_number.toLowerCase().includes(term) ||
      order.plan.name.toLowerCase().includes(term) ||
      order.id.toLowerCase().includes(term)
    )
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(order => 
      statusFilter.value === 'completed' ? order.completed : !order.completed
    )
  }

  // Sort
  filtered = filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'amount_high':
        return b.plan.price - a.plan.price
      case 'amount_low':
        return a.plan.price - b.plan.price
      default: // newest
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  return filtered
})

const totalOrders = computed(() => orders.value.length)
const completedOrders = computed(() => orders.value.filter(o => o.completed).length)
const pendingOrders = computed(() => orders.value.filter(o => !o.completed).length)
const totalAmount = computed(() => 
  orders.value.reduce((sum, order) => sum + order.plan.price, 0)
)

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPhoneNumber = (phone) => {
  // Format phone number for better display
  return phone.replace(/(\+233)(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4')
}

const getTimeSinceOrder = (dateString) => {
  const now = new Date()
  const orderDate = new Date(dateString)
  const diffMs = now - orderDate
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
  } else {
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  }
}

// Lifecycle hook
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
/* Custom animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>