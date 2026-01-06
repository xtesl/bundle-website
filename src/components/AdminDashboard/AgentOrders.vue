<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">My Orders</h2>
        <p class="text-sm text-gray-500 mt-1">Track and manage your bundle orders</p>
      </div>
      <button 
        @click="loadOrders"
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
      >
        <i class="pi pi-refresh mr-2"></i>Refresh
      </button>
    </div>

    <!-- Important Notice -->
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div class="flex gap-3">
        <i class="pi pi-info-circle text-amber-600 text-lg mt-0.5 flex-shrink-0"></i>
        <div>
          <h3 class="text-sm font-semibold text-amber-900 mb-1">Order Delays Notice</h3>
          <p class="text-sm text-amber-800 leading-relaxed">
            Orders typically complete within 2-5 minutes. If your order is taking longer than usual or showing as pending for more than 10 minutes, please use the "Report to Admin" button to notify the support team. Include the <span class="font-semibold">Order ID</span> when reporting issues.
          </p>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="flex-1">
          <label for="search-order" class="block text-xs font-medium text-gray-700 mb-1">
            Search by Phone Number or Order ID
          </label>
          <input
            id="search-order"
            v-model="searchQuery"
            type="text"
            placeholder="Enter phone number or order ID..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div class="sm:w-48">
          <label for="status-filter" class="block text-xs font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select 
            id="status-filter"
            v-model="statusFilter" 
            class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingCount }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <i class="pi pi-clock text-yellow-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Delivered</p>
            <p class="text-2xl font-bold text-gray-900">{{ deliveredCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-check-circle text-green-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Failed</p>
            <p class="text-2xl font-bold text-gray-900">{{ failedCount }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <i class="pi pi-times-circle text-red-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ orders.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="pi pi-list text-blue-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="p-4">
        <div class="animate-pulse space-y-3">
          <div v-for="n in 5" :key="n" class="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- Content (Not Loading) -->
      <div v-else>
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900 font-mono">#{{ order.external_id }}</p>
                    <p class="text-xs text-gray-500 font-mono">{{ order.id.substring(0, 13) }}...</p>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 font-mono">{{ order.beneficiary_number }}</td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900">GH₵{{ order.price_paid }}</td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full" 
                    :class="getStatusClass(order.status)"
                  >
                    {{ capitalizeStatus(order.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ formatDateTime(order.created_at) }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <button 
                    @click="viewDetails(order)"
                    class="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                  >
                    <i class="pi pi-eye mr-1"></i>View
                  </button>
                  <button 
                    v-if="order.status === 'pending' || order.status === 'processing'"
                    @click="reportToAdmin(order)"
                    class="px-3 py-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700 disabled:opacity-50 transition-colors"
                    :disabled="reporting"
                  >
                    <i class="pi pi-exclamation-triangle mr-1"></i>Report
                  </button>
                </td>
              </tr>
              <tr v-if="filteredOrders.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-500">
                  No orders found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-gray-200">
          <div v-for="order in filteredOrders" :key="order.id" class="p-4 space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-gray-500 font-mono">Order #{{ order.external_id }}</p>
                <p class="text-sm font-medium text-gray-900 mt-1">{{ order.beneficiary_number }}</p>
              </div>
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full" 
                :class="getStatusClass(order.status)"
              >
                {{ capitalizeStatus(order.status) }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p class="text-xs text-gray-500">Amount</p>
                <p class="font-semibold text-gray-900">GH₵{{ order.price_paid }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Created</p>
                <p class="text-gray-900">{{ formatDateTime(order.created_at) }}</p>
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button 
                @click="viewDetails(order)"
                class="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <i class="pi pi-eye mr-1"></i>View
              </button>
              <button 
                v-if="order.status === 'pending' || order.status === 'processing'"
                @click="reportToAdmin(order)"
                class="flex-1 px-3 py-2 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 disabled:opacity-50 transition-colors"
                :disabled="reporting"
              >
                <i class="pi pi-exclamation-triangle mr-1"></i>Report
              </button>
            </div>
          </div>
          <div v-if="filteredOrders.length === 0" class="p-8 text-center text-sm text-gray-500">
            No orders found.
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="relative max-w-lg w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 class="text-lg font-semibold text-gray-900">Order Details</h3>
          <button 
            @click="selectedOrder = null" 
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="px-6 py-6 space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Order ID (External)</label>
              <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                #{{ selectedOrder.external_id }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Internal Order ID</label>
              <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200 break-all">
                {{ selectedOrder.id }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Beneficiary Number</label>
              <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ selectedOrder.beneficiary_number }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
              <p class="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                GH₵{{ selectedOrder.price_paid }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span 
                class="inline-block px-3 py-2 text-sm font-medium rounded-lg" 
                :class="getStatusClass(selectedOrder.status)"
              >
                {{ capitalizeStatus(selectedOrder.status) }}
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Created At</label>
              <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ formatDateTime(selectedOrder.created_at) }}
              </p>
            </div>

            <div v-if="selectedOrder.completed_at">
              <label class="block text-sm font-medium text-gray-700 mb-1">Completed At</label>
              <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ formatDateTime(selectedOrder.completed_at) }}
              </p>
            </div>
          </div>

          <!-- Warning if pending for too long -->
          <div v-if="isPendingTooLong(selectedOrder)" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex gap-2">
              <i class="pi pi-exclamation-circle text-red-600 text-sm mt-0.5"></i>
              <p class="text-sm text-red-800">
                This order has been pending for longer than usual. Please report it to admin if you haven't already.
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            v-if="selectedOrder.status === 'pending' || selectedOrder.status === 'processing'"
            @click="reportToAdmin(selectedOrder)"
            :disabled="reporting"
            class="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors font-medium"
          >
            <span v-if="!reporting">Report to Admin</span>
            <span v-else>Reporting...</span>
          </button>
          <button
            @click="selectedOrder = null"
            class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Report Confirmation Modal -->
    <div v-if="orderToReport" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="relative max-w-md w-full bg-white rounded-lg shadow-xl border border-gray-200">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-amber-100 rounded-full mb-4">
            <i class="pi pi-exclamation-triangle text-amber-600 text-2xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">Report Order Issue</h3>
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">
              <span class="font-medium">Order ID:</span> <span class="font-mono">#{{ orderToReport.external_id }}</span>
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">Internal ID:</span> <span class="font-mono text-xs">{{ orderToReport.id.substring(0, 20) }}...</span>
            </p>
          </div>
          <p class="text-sm text-gray-600 text-center mb-6">
            This will notify the admin team about the delay with this order. Are you sure you want to proceed?
          </p>
          <div class="flex gap-3">
            <button
              @click="confirmReport"
              :disabled="reporting"
              class="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors font-medium"
            >
              <span v-if="!reporting">Report Issue</span>
              <span v-else>Reporting...</span>
            </button>
            <button
              @click="orderToReport = null"
              :disabled="reporting"
              class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '../../api/axios'

const searchQuery = ref('')
const statusFilter = ref('all')
const loading = ref(false)
const reporting = ref(false)
const orders = ref([])
const selectedOrder = ref(null)
const orderToReport = ref(null)

const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filter by search query (phone number or order ID)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.beneficiary_number.includes(query) ||
      order.external_id.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query)
    )
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  return filtered
})

const pendingCount = computed(() => {
  return orders.value.filter(order => order.status === 'pending' || order.status === 'processing').length
})

const deliveredCount = computed(() => {
  return orders.value.filter(order => order.status === 'delivered').length
})

const failedCount = computed(() => {
  return orders.value.filter(order => order.status === 'failed').length
})

const loadOrders = async () => {
  loading.value = true
  try {
    // Replace with your actual endpoint
    const response = await apiClient.get('/orders/agent-orders')
    if (response.status === 200) {
      orders.value = response.data
    }
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    loading.value = false
  }
}

const viewDetails = (order) => {
  selectedOrder.value = order
}

const reportToAdmin = (order) => {
  orderToReport.value = order
  selectedOrder.value = null
}

const confirmReport = async () => {
  if (!orderToReport.value) return
  
  reporting.value = true
  try {
    // Replace with your actual endpoint
    const response = await apiClient.post('/orders/report-issue', {
      order_id: orderToReport.value.id,
      external_id: orderToReport.value.external_id,
      issue_type: 'delayed_order'
    })
    
    if (response.status === 200 || response.status === 201) {
      alert('Issue reported successfully! Admin team has been notified.')
      orderToReport.value = null
    }
  } catch (error) {
    console.error('Error reporting order:', error)
    alert('Failed to report issue. Please try again or contact support directly.')
  } finally {
    reporting.value = false
  }
}

const isPendingTooLong = (order) => {
  if (order.status !== 'pending' && order.status !== 'processing') return false
  
  const createdAt = new Date(order.created_at)
  const now = new Date()
  const minutesDiff = (now - createdAt) / (1000 * 60)
  
  return minutesDiff > 10 // More than 10 minutes
}

const getStatusClass = (status) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    processing: 'bg-blue-100 text-blue-800 border border-blue-300',
    delivered: 'bg-green-100 text-green-800 border border-green-300',
    failed: 'bg-red-100 text-red-800 border border-red-300'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-300'
}

const capitalizeStatus = (status) => {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadOrders()
})
</script>