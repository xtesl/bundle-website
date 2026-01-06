<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Transaction History</h1>
        <p class="text-gray-600 mt-2">View all your wallet transactions</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Transactions</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ transactions.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Credits</p>
              <p class="text-2xl font-bold text-green-600 mt-1">GH₵{{ totalCredits.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Debits</p>
              <p class="text-2xl font-bold text-red-600 mt-1">GH₵{{ totalDebits.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
            <select 
              v-model="filterType"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="topup">Credit (Top-up)</option>
              <option value="purchase">Debit (Purchase)</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Reference</label>
            <input 
              v-model="searchRef"
              type="text"
              placeholder="Search by reference..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
          </div>

          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow-md p-12 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading transactions...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTransactions.length === 0 && !loading" class="bg-white rounded-lg shadow-md p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h3>
        <p class="text-gray-600">{{ searchRef || filterType ? 'Try adjusting your filters' : 'Your transaction history will appear here' }}</p>
      </div>

      <!-- Transactions Table -->
      <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="transaction in paginatedTransactions" 
                :key="transaction.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(transaction.created_at) }}</div>
                  <div class="text-xs text-gray-500">{{ formatTime(transaction.created_at) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="transaction.transaction_type === 'topup' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'"
                  >
                    <svg 
                      class="w-4 h-4 mr-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        v-if="transaction.transaction_type === 'topup'"
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M12 4v16m8-8H4" 
                      />
                      <path 
                        v-else
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M20 12H4" 
                      />
                    </svg>
                    {{ transaction.transaction_type === 'topup' ? 'CREDIT' : 'DEBIT' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div 
                    class="text-sm font-semibold"
                    :class="transaction.transaction_type === 'topup' ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ transaction.transaction_type === 'topup' ? '+' : '-' }}GH₵{{ parseFloat(transaction.amount).toLocaleString() }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div v-if="transaction.reference" class="text-sm text-gray-900 font-mono">
                    {{ transaction.reference }}
                  </div>
                  <div v-else class="text-sm text-gray-400 italic">
                    No reference
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredTransactions.length }}</span> transactions
            </div>
            <div class="flex gap-2">
              <button 
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button 
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
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
import apiClient from '../api/axios'

const transactions = ref([])
const loading = ref(false)
const filterType = ref('')
const searchRef = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Fetch transactions
const fetchTransactions = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('payments/transactions/me') 
    if (response.status === 200 && response.data) {
      transactions.value = response.data
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
  } finally {
    loading.value = false
  }
}

// Computed: Filter transactions
const filteredTransactions = computed(() => {
  let filtered = transactions.value

  if (filterType.value) {
    filtered = filtered.filter(t => t.transaction_type === filterType.value)
  }

  if (searchRef.value) {
    filtered = filtered.filter(t => 
      t.reference && t.reference.toLowerCase().includes(searchRef.value.toLowerCase())
    )
  }

  return filtered
})

// Computed: Calculate totals
const totalCredits = computed(() => {
  return transactions.value
    .filter(t => t.transaction_type === 'topup')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
})

const totalDebits = computed(() => {
  return transactions.value
    .filter(t => t.transaction_type === 'purchase')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
})

// Computed: Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage, filteredTransactions.value.length)
})

const paginatedTransactions = computed(() => {
  return filteredTransactions.value.slice(startIndex.value, endIndex.value)
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const clearFilters = () => {
  filterType.value = ''
  searchRef.value = ''
  currentPage.value = 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Lifecycle
onMounted(() => {
  fetchTransactions()
})
</script>