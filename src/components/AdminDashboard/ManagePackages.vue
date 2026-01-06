<template>
  <div class="space-y-6">
    <!-- Toast Notification -->
    <div 
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 max-w-md animate-slide-in"
    >
      <div 
        class="rounded-lg shadow-lg p-4 flex items-start gap-3"
        :class="toast.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'"
      >
        <svg 
          v-if="toast.type === 'success'" 
          class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <svg 
          v-else 
          class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div class="flex-1">
          <p 
            class="text-sm font-medium"
            :class="toast.type === 'success' ? 'text-green-800' : 'text-red-800'"
          >
            {{ toast.message }}
          </p>
        </div>
        <button 
          @click="toast.show = false"
          :class="toast.type === 'success' ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-800">Manage Packages</h2>
      <button 
        @click="openAddModal" 
        class="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
      >
        <span class="text-lg mr-2">+</span>Add Package
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="n in 2" :key="n" class="bg-white rounded-lg shadow-md p-6">
        <div class="animate-pulse space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Networks Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <NetworkCard 
  v-for="network in networks" 
  :key="network.id" 
  :network="network"
  @edit="openNetworkPackages"
  @edit-package="editPackage"
/>
    </div>

    <PackageListModal
      v-if="showListModal"
      :network="selectedNetwork"
      @close="closeListModal"
      @edit-package="editPackageFromList"
    />

    <!-- Package Modal -->
    <PackageModal 
      v-if="showModal"
      :packageToEdit="editingPackage"
      :networks="networks"
      @close="closeModal"
      @saved="onPackageSaved"
      @error="showToast"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../../api/axios'
import NetworkCard from './NetworkCard.vue'
import PackageModal from './PackageModal.vue'
import PackageListModal from './PackageListModal.vue'

const loading = ref(false)
const showModal = ref(false)
const editingPackage = ref(null)
const networks = ref([])

const toast = ref({
  show: false,
  type: 'success',
  message: ''
})

// Network metadata for UI
const networkMetadata = {
  mtn: { 
    color: '#FFD700',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/960px-New-mtn-logo.jpg',
  },
  vodafone: {
    color: '#E60000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/1200px-Vodafone_icon.svg.png',
  },
  airteltigo: {
    color: '#FF0000',
    logoUrl: 'https://pbs.twimg.com/profile_images/875984695647358976/CKF1jQMw_400x400.jpg',
  },
}

const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    type,
    message
  }
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const loadNetworks = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/management/networks')
    if (response.status === 200) {
      // Map networks with metadata
      const networksData = response.data.map((network, index) => {
        const networkKey = network.name.toLowerCase().replace(/\s+/g, '')
        const metadata = networkMetadata[networkKey] || { color: '#666666', logoUrl: '' }
        
        return {
          ...network,
          id: network.id || index + 1,
          color: metadata.color,
          logoUrl: metadata.logoUrl
        }
      })
      
      networks.value = networksData
      
      // Load packages for each network
      await loadAllPackages()
    }
  } catch (error) {
    console.error('Error loading networks:', error)
    showToast('Failed to load networks', 'error')
  } finally {
    loading.value = false
  }
}

const loadAllPackages = async () => {
  try {
    // Load packages for all networks
    const packagePromises = networks.value.map(network => 
      apiClient.get(`/management/creator/plans/${network.id}`)
    )
    
    const responses = await Promise.all(packagePromises)
    
    networks.value.forEach((network, index) => {
      if (responses[index].status === 200) {
        const packages = responses[index].data
        
        // Add network_id to each package for editing
        network.regular_packages = packages
          .filter(pkg => pkg.audience === 'regular')
          .map(pkg => ({ ...pkg, network_id: network.id }))
        
        network.agent_packages = packages
          .filter(pkg => pkg.audience === 'agent')
          .map(pkg => ({ ...pkg, network_id: network.id }))
      }
    })
  } catch (error) {
    console.error('Error loading packages:', error)
  }
}

const showListModal = ref(false)
const selectedNetwork = ref(null)

// Add these functions
const openNetworkPackages = (network) => {
  selectedNetwork.value = network
  showListModal.value = true
}

const closeListModal = () => {
  showListModal.value = false
}

const editPackageFromList = (pkg) => {
  closeListModal()
  editPackage(pkg)
}


// Open modal for new package
const openAddModal = () => {
  editingPackage.value = null
  showModal.value = true
}

// Open modal for editing a specific package
const editPackage = (pkg) => {
  editingPackage.value = pkg
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingPackage.value = null
}

const onPackageSaved = async (message) => {
  await loadNetworks() // Refresh the list
  showToast(message, 'success')
}

onMounted(() => {
  loadNetworks()
})
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>