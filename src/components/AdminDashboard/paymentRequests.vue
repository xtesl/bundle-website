<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Withdrawal Requests</h2>
        <p class="text-sm text-gray-500 mt-1">Manage agent withdrawal requests</p>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="loadRequests"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <i class="pi pi-refresh mr-2"></i>Refresh
        </button>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="flex-1">
          <label for="email-filter" class="block text-xs font-medium text-gray-700 mb-1">
            Filter by Agent Email
          </label>
          <input
            id="email-filter"
            v-model="emailFilter"
            type="email"
            placeholder="Enter agent email..."
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
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Pending Requests</p>
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
            <p class="text-sm text-gray-500 mb-1">Completed Requests</p>
            <p class="text-2xl font-bold text-gray-900">{{ completedCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-check-circle text-green-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Total Amount</p>
            <p class="text-2xl font-bold text-gray-900">GH₵{{ totalAmount }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="pi pi-wallet text-blue-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Requests Table -->
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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MoMo Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="request in filteredRequests" :key="request.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ request.email }}</p>
                    <p class="text-xs text-gray-500 font-mono">ID: {{ request.agent_id.substring(0, 8) }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ request.mobilemoney_name }}</td>
                <td class="px-6 py-4 text-sm text-gray-900 font-mono">{{ request.receiver_number }}</td>
                <td class="px-6 py-4">
                  <span class="text-sm font-semibold text-green-600">GH₵{{ request.amount }}</span>
                </td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full" 
                    :class="request.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  >
                    {{ request.status === 'completed' ? 'Completed' : 'Pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ formatDateTime(request.created_at) }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <button 
                    v-if="request.status !== 'completed'"
                    @click="markCompleted(request)"
                    class="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 transition-colors"
                    :disabled="processing"
                  >
                    <i class="pi pi-check mr-1"></i>Complete
                  </button>
                  <button 
                    @click="viewDetails(request)"
                    class="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                  >
                    <i class="pi pi-eye mr-1"></i>View
                  </button>
                  <button 
                    @click="confirmDelete(request)"
                    class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 transition-colors"
                    :disabled="deleting"
                  >
                    <i class="pi pi-trash mr-1"></i>Delete
                  </button>
                </td>
              </tr>
              <tr v-if="filteredRequests.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-sm text-gray-500">
                  No withdrawal requests found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-gray-200">
          <div v-for="request in filteredRequests" :key="request.id" class="p-4 space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ request.email }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ request.mobilemoney_name }}</p>
              </div>
              <div class="text-right">
                <span class="text-lg font-semibold text-green-600">GH₵{{ request.amount }}</span>
                <span 
                  class="block mt-1 px-2 py-1 text-xs font-medium rounded-full" 
                  :class="request.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ request.status === 'completed' ? 'Completed' : 'Pending' }}
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p class="text-xs text-gray-500">Phone</p>
                <p class="font-mono text-gray-900">{{ request.receiver_number }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Date</p>
                <p class="text-gray-900">{{ formatDateTime(request.created_at) }}</p>
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button 
                v-if="request.status !== 'completed'"
                @click="markCompleted(request)"
                class="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
                :disabled="processing"
              >
                <i class="pi pi-check mr-1"></i>Complete
              </button>
              <button 
                @click="viewDetails(request)"
                class="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <i class="pi pi-eye mr-1"></i>View
              </button>
              <button 
                @click="confirmDelete(request)"
                class="flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
                :disabled="deleting"
              >
                <i class="pi pi-trash mr-1"></i>Delete
              </button>
            </div>
          </div>
          <div v-if="filteredRequests.length === 0" class="p-8 text-center text-sm text-gray-500">
            No withdrawal requests found.
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="selectedRequest" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="relative max-w-lg w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 class="text-lg font-semibold text-gray-900">Withdrawal Request Details</h3>
          <button 
            @click="selectedRequest = null" 
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="px-6 py-6 space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Request ID</label>
              <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ selectedRequest.id }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Agent ID</label>
              <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ selectedRequest.agent_id }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Agent Email</label>
              <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ selectedRequest.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Money Name</label>
              <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ selectedRequest.mobilemoney_name }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Receiver Number</label>
              <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ selectedRequest.receiver_number }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div class="flex items-center gap-2">
                <span 
                  class="px-3 py-2 text-sm font-medium rounded-lg flex-1 text-center" 
                  :class="selectedRequest.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'"
                >
                  {{ selectedRequest.status === 'completed' ? 'Completed' : 'Pending' }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <p class="text-lg font-semibold text-green-600 bg-green-50 px-3 py-2 rounded border border-green-200">
                GH₵{{ selectedRequest.amount }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Created At</label>
              <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                {{ formatDateTime(selectedRequest.created_at) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            v-if="selectedRequest.status !== 'completed'"
            @click="markCompleted(selectedRequest)"
            :disabled="processing"
            class="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
          >
            <span v-if="!processing">Mark as Completed</span>
            <span v-else>Processing...</span>
          </button>
          <button
            @click="confirmDelete(selectedRequest)"
            :disabled="deleting"
            class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
          >
            <span v-if="!deleting">Delete Request</span>
            <span v-else>Deleting...</span>
          </button>
          <button
            @click="selectedRequest = null"
            class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="requestToDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="relative max-w-md w-full bg-white rounded-lg shadow-xl border border-gray-200">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <i class="pi pi-exclamation-triangle text-red-600 text-2xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">Delete Withdrawal Request</h3>
          <p class="text-sm text-gray-600 text-center mb-6">
            Are you sure you want to delete this withdrawal request for <span class="font-semibold">GH₵{{ requestToDelete.amount }}</span>? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button
              @click="deleteRequest"
              :disabled="deleting"
              class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
            >
              <span v-if="!deleting">Delete</span>
              <span v-else>Deleting...</span>
            </button>
            <button
              @click="requestToDelete = null"
              :disabled="deleting"
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

const statusFilter = ref('all')
const emailFilter = ref('')
const loading = ref(false)
const deleting = ref(false)
const processing = ref(false)
const withdrawalRequests = ref([])
const selectedRequest = ref(null)
const requestToDelete = ref(null)

const filteredRequests = computed(() => {
  let filtered = withdrawalRequests.value

  // Filter by email
  if (emailFilter.value.trim()) {
    filtered = filtered.filter(req => 
      req.email.toLowerCase().includes(emailFilter.value.toLowerCase())
    )
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(req => {
      if (statusFilter.value === 'pending') {
        return !req.status || req.status !== 'completed'
      } else if (statusFilter.value === 'completed') {
        return req.status === 'completed'
      }
      return true
    })
  }

  return filtered
})

const pendingCount = computed(() => {
  return withdrawalRequests.value.filter(req => !req.status || req.status !== 'completed').length
})

const completedCount = computed(() => {
  return withdrawalRequests.value.filter(req => req.status === 'completed').length
})

const totalAmount = computed(() => {
  return withdrawalRequests.value.reduce((sum, request) => 
    sum + parseFloat(request.amount || 0), 0
  ).toFixed(2)
})

const loadRequests = async () => {
  loading.value = true
  try {
    // Replace with your actual endpoint
    const response = await apiClient.get('/payments/payment-requests')
    if (response.status === 200) {
      withdrawalRequests.value = response.data
    }
  } catch (error) {
    console.error('Error loading payment requests:', error)
  } finally {
    loading.value = false
  }
}

const markCompleted = async (request) => {
  processing.value = true
  try {
    // Replace with your actual endpoint
    const response = await apiClient.patch(`/management/payment-requests/${request.id}/complete`)
    
    if (response.status === 200) {
      // Update the request in the list
      const index = withdrawalRequests.value.findIndex(req => req.id === request.id)
      if (index !== -1) {
        withdrawalRequests.value[index].status = 'completed'
      }
      // Update selected request if it's the same
      if (selectedRequest.value && selectedRequest.value.id === request.id) {
        selectedRequest.value.status = 'completed'
      }
    }
  } catch (error) {
    console.error('Error marking request as completed:', error)
    alert('Failed to mark request as completed. Please try again.')
  } finally {
    processing.value = false
  }
}

const viewDetails = (request) => {
  selectedRequest.value = request
}

const confirmDelete = (request) => {
  requestToDelete.value = request
  selectedRequest.value = null
}

const deleteRequest = async () => {
  if (!requestToDelete.value) return
  
  deleting.value = true
  try {
    // Replace with your actual endpoint
    const response = await apiClient.delete(`/management/withdrawal-requests/${requestToDelete.value.id}`)
    
    if (response.status === 200 || response.status === 204) {
      withdrawalRequests.value = withdrawalRequests.value.filter(
        req => req.id !== requestToDelete.value.id
      )
      requestToDelete.value = null
    }
  } catch (error) {
    console.error('Error deleting withdrawal request:', error)
    alert('Failed to delete request. Please try again.')
  } finally {
    deleting.value = false
  }
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
  loadRequests()
})
</script>