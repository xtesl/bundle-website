<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-800">User Management</h2>
    </div>

    <!-- Search Section -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label for="email-search" class="block text-sm font-medium text-gray-700 mb-2">
            Search User by Email
          </label>
          <div class="flex gap-2">
            <input
              id="email-search"
              v-model="searchEmail"
              type="email"
              placeholder="Enter user email..."
              class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="searchUser"
            />
            <button
              @click="searchUser"
              :disabled="searching || !searchEmail.trim()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="!searching">Search</span>
              <span v-else>Searching...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Search Result Message -->
      <div v-if="searchAttempted && !selectedUser" class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-sm text-yellow-800">No user found with this email address.</p>
      </div>
    </div>

    <!-- User Details Section -->
    <div v-if="selectedUser" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">User Details</h3>
        <button
          @click="clearSelection"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <div class="p-6">
        <!-- User Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Read-only Fields -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
              {{ selectedUser.id }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
              {{ selectedUser.email }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Created At</label>
            <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
              {{ formatDateTime(selectedUser.created_at) }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Profile</label>
            <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
              {{ selectedUser.profile || 'Not set' }}
            </p>
          </div>

          <!-- Editable Fields -->
          <div>
            <label for="role-select" class="block text-sm font-medium text-gray-700 mb-1">
              Role <span class="text-red-500">*</span>
            </label>
            <select
              id="role-select"
              v-model="editForm.role"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label for="status-select" class="block text-sm font-medium text-gray-700 mb-1">
              Account Status <span class="text-red-500">*</span>
            </label>
            <select
              id="status-select"
              v-model="editForm.is_active"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            @click="updateUser"
            :disabled="updating || !hasChanges"
            class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="!updating">Update User</span>
            <span v-else>Updating...</span>
          </button>
          <button
            @click="viewProfits"
            class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            View Agent Earnings
          </button>
        </div>
      </div>
    </div>

    <!-- Agent Earnings Section -->
    <div v-if="showProfits" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            Agent Earnings - {{ selectedUser?.email }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">Completed orders and total earnings</p>
        </div>
        <button
          @click="closeProfits"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <div class="p-6">
        <!-- Loading State -->
        <div v-if="loadingProfits" class="animate-pulse space-y-3">
          <div v-for="n in 3" :key="n" class="h-12 bg-gray-200 rounded"></div>
        </div>

        <!-- Earnings Content -->
        <div v-else>
          <!-- Earnings Summary Card -->
          <div class="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Total Earnings</p>
                <p class="text-3xl font-bold text-gray-900">GH₵{{ totalEarnings }}</p>
                <p class="text-sm text-gray-500 mt-1">From {{ completedOrders.length }} completed orders</p>
              </div>
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <i class="pi pi-dollar text-green-600 text-2xl"></i>
              </div>
            </div>
          </div>

          <!-- Filter Section -->
          <div class="mb-4 flex justify-between items-center">
            <h4 class="text-sm font-semibold text-gray-900">Completed Orders</h4>
            <select 
              v-model="orderFilter" 
              class="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <!-- Desktop Table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed At</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 font-mono">
                    #{{ order.external_id }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ order.beneficiary_number }}</td>
                  <td class="px-6 py-4 text-sm font-semibold text-green-600">GH₵{{ order.price_paid }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ formatDateTime(order.completed_at) }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
                <tr v-if="filteredOrders.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-sm text-gray-500">
                    No completed orders found for this agent.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards -->
          <div class="md:hidden divide-y divide-gray-200">
            <div v-for="order in filteredOrders" :key="order.id" class="py-4 space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-xs text-gray-500 font-mono">Order #{{ order.external_id }}</p>
                  <p class="text-sm font-medium text-gray-900 mt-1">{{ order.beneficiary_number }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {{ order.status }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs text-gray-500">Amount</p>
                  <p class="text-lg font-semibold text-green-600">GH₵{{ order.price_paid }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">Completed</p>
                  <p class="text-xs text-gray-900">{{ formatDateTime(order.completed_at) }}</p>
                </div>
              </div>
            </div>
            <div v-if="filteredOrders.length === 0" class="py-8 text-center text-sm text-gray-500">
              No completed orders found for this agent.
            </div>
          </div>

          <!-- Stats Footer -->
          <div v-if="filteredOrders.length > 0" class="mt-6 pt-4 border-t border-gray-200">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Total Orders</p>
                <p class="text-lg font-semibold text-gray-900">{{ filteredOrders.length }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 mb-1">Total Amount</p>
                <p class="text-lg font-semibold text-gray-900">GH₵{{ filteredTotalEarnings }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import apiClient from '../../api/axios'

const searchEmail = ref('')
const searching = ref(false)
const searchAttempted = ref(false)
const selectedUser = ref(null)
const updating = ref(false)
const showProfits = ref(false)
const loadingProfits = ref(false)
const completedOrders = ref([])
const orderFilter = ref('all')

const editForm = ref({
  role: '',
  is_active: true
})

const hasChanges = computed(() => {
  if (!selectedUser.value) return false
  return editForm.value.role !== selectedUser.value.role || 
         editForm.value.is_active !== selectedUser.value.is_active
})

const totalEarnings = computed(() => {
  return completedOrders.value.reduce((sum, order) => sum + parseFloat(order.price_paid || 0), 0).toFixed(2)
})

const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') return completedOrders.value
  
  const now = new Date()
  return completedOrders.value.filter(order => {
    const completedDate = new Date(order.completed_at)
    
    if (orderFilter.value === 'today') {
      return completedDate.toDateString() === now.toDateString()
    } else if (orderFilter.value === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return completedDate >= weekAgo
    } else if (orderFilter.value === 'month') {
      return completedDate.getMonth() === now.getMonth() && 
             completedDate.getFullYear() === now.getFullYear()
    }
    return true
  })
})

const filteredTotalEarnings = computed(() => {
  return filteredOrders.value.reduce((sum, order) => sum + parseFloat(order.price_paid || 0), 0).toFixed(2)
})

const searchUser = async () => {
  if (!searchEmail.value.trim()) return
  
  searching.value = true
  searchAttempted.value = false
  selectedUser.value = null
  showProfits.value = false
  
  try {
    // Replace with your actual endpoint
    const response = await apiClient.get(`/management/users/search?email=${encodeURIComponent(searchEmail.value)}`)
    
    if (response.status === 200 && response.data) {
      selectedUser.value = response.data
      editForm.value = {
        role: response.data.role,
        is_active: response.data.is_active
      }
    }
  } catch (error) {
    console.error('Error searching user:', error)
    searchAttempted.value = true
  } finally {
    searching.value = false
  }
}

const updateUser = async () => {
  if (!selectedUser.value || !hasChanges.value) return
  
  updating.value = true
  
  try {
    // Replace with your actual endpoint
    const response = await apiClient.patch(`/management/admin/update-user/${selectedUser.value.email}`, {
      role: editForm.value.role,
      is_active: editForm.value.is_active
    })
    
    if (response.status === 200) {
      selectedUser.value.role = editForm.value.role
      selectedUser.value.is_active = editForm.value.is_active
      alert('User updated successfully!')
    }
  } catch (error) {
    console.error('Error updating user:', error)
    alert('Failed to update user. Please try again.')
  } finally {
    updating.value = false
  }
}

const viewProfits = async () => {
  if (!selectedUser.value) return
  
  showProfits.value = true
  loadingProfits.value = true
  
  try {
    // Fetch completed orders for the agent
    const response = await apiClient.get(`/management/agents/earned/${selectedUser.value.id}`)
    
    if (response.status === 200) {
      // Filter only completed/delivered orders
      completedOrders.value = response.data.filter(order => 
        order.status === 'delivered' || order.status === 'completed'
      )
    }
  } catch (error) {
    console.error('Error loading agent orders:', error)
    completedOrders.value = []
  } finally {
    loadingProfits.value = false
  }
}

const closeProfits = () => {
  showProfits.value = false
  completedOrders.value = []
  orderFilter.value = 'all'
}

const clearSelection = () => {
  selectedUser.value = null
  searchEmail.value = ''
  searchAttempted.value = false
  showProfits.value = false
  completedOrders.value = []
  orderFilter.value = 'all'
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
</script>