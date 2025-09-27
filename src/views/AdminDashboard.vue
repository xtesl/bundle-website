<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-gray-900 border-b border-yellow-400 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-yellow-400">Admin Control</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center">
                <span class="text-sm font-bold">A</span>
              </div>
              <span class="text-sm font-medium text-gray-200">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <div class="w-64 min-h-screen bg-gray-900 shadow-lg" :class="{ 'hidden lg:block': !sidebarOpen, 'block': sidebarOpen }">
        <nav class="mt-5 px-4">
          <div class="space-y-2">
            <button v-for="item in sidebarItems" :key="item.id" @click="setActiveTab(item.id)"
                    class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all"
                    :class="activeTab === item.id ? 'bg-yellow-400 text-gray-900' : 'text-gray-300 hover:bg-gray-800'">
              <i :class="item.icon" class="mr-3"></i>
              {{ item.name }}
              <span v-if="item.badge" class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {{ item.badge }}
              </span>
            </button>
          </div>
        </nav>
      </div>

      <!-- Mobile Sidebar Toggle -->
      <button class="lg:hidden fixed top-20 left-4 z-40 p-2 rounded-lg bg-yellow-400 text-gray-900"
              @click="sidebarOpen = !sidebarOpen">
        <i class="pi pi-bars"></i>
      </button>

      <!-- Main Content -->
      <div class="flex-1 p-6">
        
        <!-- Leaderboard Tab -->
        <div v-if="activeTab === 'leaderboard'" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800">Agent Leaderboard</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Bundles Sold Leaderboard -->
            <div class="bg-white rounded-lg shadow-md">
              <div class="p-4 border-b">
                <h3 class="text-lg font-semibold flex items-center">
                  <i class="pi pi-trophy text-yellow-500 mr-2"></i>
                  Top Bundle Sales
                </h3>
              </div>
              <div class="p-4" v-if="loading.leaderboard">
                <div class="animate-pulse space-y-3">
                  <div v-for="n in 5" :key="n" class="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="p-4" v-else>
                <div v-for="(agent, index) in bundleLeaderboard" :key="agent.id" 
                     class="flex items-center justify-between p-3 rounded-lg mb-2"
                     :class="index < 3 ? 'bg-yellow-50' : 'bg-gray-50'">
                  <div class="flex items-center">
                    <span class="text-lg font-bold mr-3" 
                          :class="index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-gray-600'">
                      #{{ index + 1 }}
                    </span>
                    <div>
                      <p class="font-medium">{{ agent.name }}</p>
                      <p class="text-sm text-gray-500">{{ agent.bundles_sold }} bundles</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold">${{ agent.total_earnings }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Referrals Leaderboard -->
            <div class="bg-white rounded-lg shadow-md">
              <div class="p-4 border-b">
                <h3 class="text-lg font-semibold flex items-center">
                  <i class="pi pi-users text-blue-500 mr-2"></i>
                  Top Referrals
                </h3>
              </div>
              <div class="p-4" v-if="loading.leaderboard">
                <div class="animate-pulse space-y-3">
                  <div v-for="n in 5" :key="n" class="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="p-4" v-else>
                <div v-for="(agent, index) in referralLeaderboard" :key="agent.id" 
                     class="flex items-center justify-between p-3 rounded-lg mb-2"
                     :class="index < 3 ? 'bg-blue-50' : 'bg-gray-50'">
                  <div class="flex items-center">
                    <span class="text-lg font-bold mr-3" 
                          :class="index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-gray-600'">
                      #{{ index + 1 }}
                    </span>
                    <div>
                      <p class="font-medium">{{ agent.name }}</p>
                      <p class="text-sm text-gray-500">{{ agent.referrals }} referrals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bundle Requests Tab -->
        <div v-if="activeTab === 'requests'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">Bundle Requests</h2>
            <select v-model="requestFilter" class="px-4 py-2 rounded-lg border border-gray-300">
              <option value="all">All Requests</option>
              <option value="0">Pending</option>
              <!-- <option value="processing">Processing</option> -->
              <option value="1">Completed</option>
              <!-- <option value="failed">Failed</option> -->
            </select>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto" v-if="loading.requests">
              <div class="animate-pulse p-4">
                <div v-for="n in 5" :key="n" class="h-12 bg-gray-200 rounded mb-3"></div>
              </div>
            </div>
            <div class="overflow-x-auto" v-else>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
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
                      <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getStatusClass(request.completed)">
                        {{ request.completed }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm space-x-2">
                      <button v-if="!request.completed" @click="processRequest(request.id)"
                              class="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                              :disabled="loading.processing"
                              >
                           Mark Completed
                      </button>
                      <button v-if="request.completed" @click="processRequest(request.id

                      )"
                              class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                              :disabled="loading.processing">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Packages Tab -->
        <div v-if="activeTab === 'packages'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">Manage Packages</h2>
            <button @click="showPackageModal = true" 
                    class="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500">
              <i class="pi pi-plus mr-2"></i>Add Package
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="loading.packages">
            <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow-md p-6">
              <div class="animate-pulse space-y-4">
                <div class="h-6 bg-gray-200 rounded w-1/3"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded"></div>
                  <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-else>
            <div v-for="network in bundlePackages" :key="network.id" class="bg-white rounded-lg shadow-md">
              <div class="p-4 border-b">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold flex items-center">
                    <div class="w-6 h-6 rounded-full mr-2" :style="{ backgroundColor: network.color }"></div>
                    {{ network.name }}
                  </h3>
                  <button @click="editNetwork(network)" class="text-gray-400 hover:text-gray-600">
                    <i class="pi pi-pencil"></i>
                  </button>
                </div>
              </div>
              
              <div class="p-4 space-y-4">
                <!-- Regular Packages -->
                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Regular Packages</h4>
                  <div class="space-y-2">
                    <div v-for="plan in network.regular_packages" :key="plan.id"
                         class="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span class="text-sm">{{ plan.value }} - {{ plan.duration }}</span>
                      <span class="text-sm font-medium">${{ plan.price }}</span>
                    </div>
                  </div>
                </div>

                <!-- Agent Packages -->
                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Agent Packages</h4>
                  <div class="space-y-2">
                    <div v-for="plan in network.agent_packages" :key="plan.id"
                         class="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span class="text-sm">{{ plan.value }} - {{ plan.duration }}</span>
                      <span class="text-sm font-medium">${{ plan.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Package Modal -->
    <div v-if="showPackageModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">{{ editingNetwork ? 'Edit Network' : 'Add Network' }}</h3>
            <button @click="closePackageModal" class="text-gray-400 hover:text-gray-600">
              <i class="pi pi-times"></i>
            </button>
          </div>

          <form @submit.prevent="saveNetwork" class="space-y-6" v-if="!loading.saving">
            <div>
              <label class="block text-sm font-medium mb-2">Network Name</label>
              <select v-model="networkForm.name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Network</option>
                <option value="MTN">MTN</option>
                <option value="Airtel">Airtel</option>
                <option value="Glo">Glo</option>
                <option value="9mobile">9mobile</option>
              </select>
            </div>

            <div>
              <h4 class="font-medium mb-3">Regular Packages</h4>
              <div class="space-y-3">
                <div v-for="(plan, index) in networkForm.regular_packages" :key="index"
                     class="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded">
                  <input v-model="plan.value" placeholder="e.g., 1GB" required class="px-3 py-2 border border-gray-300 rounded">
                  <input v-model="plan.duration" placeholder="e.g., 30 days" required class="px-3 py-2 border border-gray-300 rounded">
                  <div class="flex gap-2">
                    <input v-model="plan.price" type="number" step="0.01" placeholder="Price" required class="flex-1 px-3 py-2 border border-gray-300 rounded">
                    <button type="button" @click="removeRegularPlan(index)" class="px-2 py-2 bg-red-600 text-white rounded text-sm">
                      <i class="pi pi-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" @click="addRegularPlan" class="mt-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded text-sm hover:border-gray-400">
                <i class="pi pi-plus mr-2"></i>Add Regular Plan
              </button>
            </div>

            <div>
              <h4 class="font-medium mb-3">Agent Packages</h4>
              <div class="space-y-3">
                <div v-for="(plan, index) in networkForm.agent_packages" :key="index"
                     class="grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded">
                  <input v-model="plan.value" placeholder="e.g., 1GB" required class="px-3 py-2 border border-gray-300 rounded">
                  <input v-model="plan.duration" placeholder="e.g., 30 days" required class="px-3 py-2 border border-gray-300 rounded">
                  <div class="flex gap-2">
                    <input v-model="plan.price" type="number" step="0.01" placeholder="Price" required class="flex-1 px-3 py-2 border border-gray-300 rounded">
                    <button type="button" @click="removeAgentPlan(index)" class="px-2 py-2 bg-red-600 text-white rounded text-sm">
                      <i class="pi pi-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" @click="addAgentPlan" class="mt-2 px-4 py-2 border-2 border-dashed border-blue-300 rounded text-sm hover:border-blue-400">
                <i class="pi pi-plus mr-2"></i>Add Agent Plan
              </button>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="closePackageModal" class="px-6 py-2 border border-gray-300 rounded-lg">
                Cancel
              </button>
              <button type="submit" class="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium">
                {{ editingNetwork ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>

          <div v-if="loading.saving" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from "../api/axios"

// Reactive state
const activeTab = ref('leaderboard')
const sidebarOpen = ref(false)
const showPackageModal = ref(false)
const editingNetwork = ref(null)
const requestFilter = ref('all')

// Loading states
const loading = ref({
  leaderboard: false,
  requests: false,
  packages: false,
  processing: false,
  saving: false
})

// Sidebar items
const sidebarItems = ref([
  { id: 'leaderboard', name: 'Leaderboard', icon: 'pi pi-trophy' },
  { id: 'requests', name: 'Bundle Requests', icon: 'pi pi-list', badge: 3 },
  { id: 'packages', name: 'Manage Packages', icon: 'pi pi-box' }
])

// Sample data - minimal
const bundleLeaderboard = ref([
  { id: 1, name: 'John Agent', bundles_sold: 245, total_earnings: '1200.50' },
  { id: 2, name: 'Sarah Pro', bundles_sold: 189, total_earnings: '945.00' }
])

const referralLeaderboard = ref([
  { id: 1, name: 'Mike Referrer', referrals: 34 },
  { id: 2, name: 'Lisa Network', referrals: 28 }
])

const bundleRequests = ref([
  { 
    id: '001', 
    beneficiary_number: '0801234567', 
    plan: { price: '20.00', value: '5GB', duration: '30 days' }, 
    status: 'pending' 
  },
  { 
    id: '002', 
    beneficiary_number: '0701234567', 
    plan: { price: '9.20', value: '2GB', duration: '30 days' }, 
    status: 'processing' 
  }
])

const bundlePackages = ref([
  {
    id: 1,
    name: 'MTN',
    color: '#FFD700',
    regular_packages: [
      { id: 1, value: '1GB', duration: '30 days', price: '5.00' },
      { id: 2, value: '5GB', duration: '30 days', price: '20.00' }
    ],
    agent_packages: [
      { id: 3, value: '1GB', duration: '30 days', price: '4.50' },
      { id: 4, value: '5GB', duration: '30 days', price: '18.00' }
    ]
  }
])

// Network form
const networkForm = ref({
  name: '',
  regular_packages: [{ value: '', duration: '', price: '' }],
  agent_packages: [{ value: '', duration: '', price: '' }]
})

// Computed
const filteredRequests = computed(() => {
  if (requestFilter.value === 'all') return bundleRequests.value
  return bundleRequests.value.filter(req => req.completed == requestFilter.value)
})

// Methods
const setActiveTab = (tabId) => {
  activeTab.value = tabId
  if (window.innerWidth < 1024) sidebarOpen.value = false
}

const getStatusClass = (status) => {
  const classes = {
    false: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    true: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// API Methods (prepare for implementation)
const loadLeaderboard = async () => {
  loading.value.leaderboard = true
  try {
    // TODO: API call to fetch leaderboard data
    // const response = await fetch('/api/admin/leaderboard')
    // const data = await response.json()
    // bundleLeaderboard.value = data.bundles
    // referralLeaderboard.value = data.referrals
  } catch (error) {
    console.error('Error loading leaderboard:', error)
  } finally {
    loading.value.leaderboard = false
  }
}

const loadRequests = async () => {
  loading.value.requests = true
  try {

    const response = await apiClient.get("management/orders")
    if(response.status == 200){
        bundleRequests.value = response.data;
    }
 
  } catch (error) {
    console.error('Error loading requests:', error)
  } finally {
    loading.value.requests = false
  }
}

const loadPackages = async () => {
  loading.value.packages = true
  try {
    // TODO: API call to fetch packages
    // const response = await fetch('/api/admin/packages')
    // bundlePackages.value = await response.json()
  } catch (error) {
    console.error('Error loading packages:', error)
  } finally {
    loading.value.packages = false
  }
}

const processRequest = async (requestId) => {
  loading.value.processing = true
  try {
     
    const response = await apiClient.patch(`/management/orders/${requestId}`, {"completed": true})
    
    if (response.status == 200) {
      const request = bundleRequests.value.find(req => req.id === requestId)
      request.completed = true;
    }
  } catch (error) {
    console.error('Error processing request:', error)
  } finally {
    loading.value.processing = false
  }
}

const saveNetwork = async () => {
  loading.value.saving = true
  try {
    const networkColors = { 'MTN': '#FFD700', 'Airtel': '#FF0000', 'Glo': '#008000', '9mobile': '#0066CC' }
    
    // TODO: API call to save network
    // const response = await fetch('/api/admin/networks', {
    //   method: editingNetwork.value ? 'PUT' : 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...networkForm.value,
    //     color: networkColors[networkForm.value.name]
    //   })
    // })
    
    if (editingNetwork.value) {
      const index = bundlePackages.value.findIndex(pkg => pkg.id === editingNetwork.value.id)
      if (index > -1) {
        bundlePackages.value[index] = {
          ...editingNetwork.value,
          name: networkForm.value.name,
          color: networkColors[networkForm.value.name],
          regular_packages: networkForm.value.regular_packages,
          agent_packages: networkForm.value.agent_packages
        }
      }
    } else {
      bundlePackages.value.push({
        id: Date.now(),
        name: networkForm.value.name,
        color: networkColors[networkForm.value.name],
        regular_packages: networkForm.value.regular_packages,
        agent_packages: networkForm.value.agent_packages
      })
    }
    
    closePackageModal()
  } catch (error) {
    console.error('Error saving network:', error)
  } finally {
    loading.value.saving = false
  }
}

const editNetwork = (network) => {
  editingNetwork.value = network
  networkForm.value = {
    name: network.name,
    regular_packages: [...network.regular_packages],
    agent_packages: [...network.agent_packages]
  }
  showPackageModal.value = true
}

const closePackageModal = () => {
  showPackageModal.value = false
  editingNetwork.value = null
  networkForm.value = {
    name: '',
    regular_packages: [{ value: '', duration: '', price: '' }],
    agent_packages: [{ value: '', duration: '', price: '' }]
  }
}

const addRegularPlan = () => {
  networkForm.value.regular_packages.push({ value: '', duration: '', price: '' })
}

const removeRegularPlan = (index) => {
  if (networkForm.value.regular_packages.length > 1) {
    networkForm.value.regular_packages.splice(index, 1)
  }
}

const addAgentPlan = () => {
  networkForm.value.agent_packages.push({ value: '', duration: '', price: '' })
}

const removeAgentPlan = (index) => {
  if (networkForm.value.agent_packages.length > 1) {
    networkForm.value.agent_packages.splice(index, 1)
  }
}

// Initialize
onMounted(() => {
  // Load initial data
  // loadLeaderboard()
  loadRequests()  
  // loadPackages()
})
</script>

<style scoped>
.pi {
  display: inline-block;
  vertical-align: middle;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(254, 221, 0, 0.3);
  border-radius: 3px;
}

@media (max-width: 768px) {
  table {
    min-width: 700px;
  }
}
</style>