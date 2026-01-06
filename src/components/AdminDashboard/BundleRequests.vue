<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-800">Bundle Requests</h2>
      <select 
        v-model="requestFilter" 
        class="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      >
        <option value="all">All Requests</option>
        <option value="0">Pending</option>
        <option value="1">Completed</option>
      </select>
    </div>

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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="request in filteredRequests" :key="request.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ request.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ request.beneficiary_number }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <p class="font-medium">GH₵{{ request.plan.price }} - {{ request.plan.value }}</p>
                    <p class="text-gray-500">{{ request.plan.duration }}</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full" 
                    :class="request.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  >
                    {{ request.completed ? 'Completed' : 'Pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <button 
                    v-if="!request.completed" 
                    @click="markCompleted(request.id)"
                    class="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50"
                    :disabled="processing"
                  >
                    Mark Completed
                  </button>
                  <button 
                    v-if="request.completed" 
                    @click="deleteRequest(request.id)"
                    class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
                    :disabled="processing"
                  >
                    Delete
                  </button>
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
                <p class="text-sm font-medium text-gray-500">ID: {{ request.id }}</p>
                <p class="text-sm font-medium text-gray-900">{{ request.beneficiary_number }}</p>
              </div>
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full" 
                :class="request.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ request.completed ? 'Completed' : 'Pending' }}
              </span>
            </div>
            <div class="text-sm">
              <p class="font-medium text-gray-900">GH₵{{ request.plan.price }} - {{ request.plan.value }}</p>
              <p class="text-gray-500">{{ request.plan.duration }}</p>
            </div>
            <div class="flex gap-2">
              <button 
                v-if="!request.completed" 
                @click="markCompleted(request.id)"
                class="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                :disabled="processing"
              >
                Mark Completed
              </button>
              <button 
                v-if="request.completed" 
                @click="deleteRequest(request.id)"
                class="flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
                :disabled="processing"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '../../api/axios'

const requestFilter = ref('all')
const loading = ref(false)
const processing = ref(false)
const bundleRequests = ref([])

const filteredRequests = computed(() => {
  if (requestFilter.value === 'all') return bundleRequests.value
  return bundleRequests.value.filter(req => req.completed == requestFilter.value)
})

const loadRequests = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('management/orders')
    if (response.status === 200) {
      bundleRequests.value = response.data
    }
  } catch (error) {
    console.error('Error loading requests:', error)
  } finally {
    loading.value = false
  }
}

const markCompleted = async (requestId) => {
  processing.value = true
  try {
    const response = await apiClient.patch(`/management/orders/${requestId}`, { completed: true })
    if (response.status === 200) {
      const request = bundleRequests.value.find(req => req.id === requestId)
      if (request) request.completed = true
    }
  } catch (error) {
    console.error('Error marking completed:', error)
  } finally {
    processing.value = false
  }
}

const deleteRequest = async (requestId) => {
  processing.value = true
  try {
    await apiClient.delete(`/management/orders/${requestId}`)
    bundleRequests.value = bundleRequests.value.filter(req => req.id !== requestId)
  } catch (error) {
    console.error('Error deleting request:', error)
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  loadRequests()
})
</script>