<template>
       
  <div class="min-h-screen" style="background-color: #f3f2f2;">
       <div 
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 max-w-md animate-slide-in"
    >
      <div 
        class="rounded-lg  p-4 flex items-start gap-3"
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

    <!-- Header Section -->
    <div class="border-b" style="background-color: #0d000a; border-color: rgba(254, 221, 0, 0.2);">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col space-y-4">
          <!-- Title Row -->
          <div>
            <h1 class="text-2xl font-bold tracking-tight" style="color: #f3f2f2; letter-spacing: -0.025em;">Buy Data Bundle</h1>
            <p class="mt-1 text-sm opacity-80 font-medium" style="color: #f3f2f2;">Purchase data bundles for any network</p>
          </div>

         
          <!-- LoginText Component for non-authenticated users -->
          <div v-if="!isAuthenticated" class="w-full">
            <LoginText />
          </div>
          
          <!-- Current Balance and Action Buttons for authenticated users -->
          <div v-if="isAuthenticated" class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <!-- Current Balance -->
            <div class="flex items-center rounded-sm px-4 py-3 border-opacity-30" 
                 style="background-color: rgba(243, 242, 242, 0.95); border-color: #fedd00;">
              <i class="pi pi-wallet mr-3 text-lg" style="color: #fedd00;"></i>
              <div class="flex flex-col">
                <span class="text-xs font-semibold uppercase tracking-wider opacity-70" style="color: #0d000a; letter-spacing: 0.1em;">Current Balance</span>
                <WalletBalance />
                <!-- <span class="text-lg font-bold" style="color: #0d000a; font-weight: 700;"> GH₵{{ userData.account_balance.toLocaleString() }}</span> -->
              </div>
            </div>
            
            <!-- Action Buttons Container -->
            <div class="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 w-full sm:w-auto">
              <!-- Transaction History Button -->
              <!-- <button class="flex items-center justify-center px-4 py-3 rounded-sm font-semibold transition-all duration-200 border-2 hover:border-opacity-80 flex-1 xs:flex-none" 
                      style="background-color: transparent; color: #f3f2f2; border-color: rgba(254, 221, 0, 0.6); font-weight: 600;"
                      @click="openTransactionHistory"
                      @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                      @mouseleave="$event.target.style.backgroundColor = 'transparent'">
                <i class="pi pi-history mr-2"></i>
                <span class="hidden xs:inline">History</span>
                <span class="xs:hidden">Transaction History</span>
              </button> -->
              
              <!-- Top Up Button -->
              <button class="flex items-center justify-center px-4 py-3 rounded-sm font-semibold transition-all duration-200 border-transparent hover:border-opacity-50 flex-1 xs:flex-none" 
                      style="background-color: #fedd00; color: #0d000a; border-color: #fedd00; font-weight: 600;"
                      @click="openTopupModal">
                <i class="pi pi-plus mr-2"></i>
                <span>Top Up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Purchase Form -->
        <div class="lg:col-span-2">
          <div class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            
            <!-- Form Header -->
            <div class="px-6 py-4 border-b border-opacity-10" style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h2 class="text-lg font-semibold tracking-tight" style="color: #0d000a; font-weight: 600;">Purchase Details</h2>
              <p class="text-sm opacity-60 mt-1 font-medium" style="color: #0d000a;">Fill in the details below to purchase data bundle</p>
            </div>

            <!-- Form Content -->
            <div class="p-6 space-y-6">
              
              <!-- Network Selection -->
             <!-- Network Selection -->
<div class="space-y-3">
  <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
    <i class="pi pi-wifi mr-2" style="color: #fedd00;"></i>
    Select Network
  </label>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
    <div v-for="network in networks" :key="network.id"
         @click="onSelectedNetwork(network)"
         class="relative cursor-pointer border-2 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-yellow-300"
         :class="selectedNetwork?.id === network.id 
           ? 'border-yellow-400 bg-yellow-50 shadow-md ring-2 ring-yellow-200' 
           : 'border-gray-200 bg-white hover:border-gray-300'">
      
      <!-- Logo Container -->
      <div class="relative w-full h-12 sm:h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-md border border-gray-100 overflow-hidden">
        <img 
          :src="network.logoUrl" 
          :alt="network.name + ' logo'"
          class="max-w-full max-h-full w-auto h-auto object-contain"
          @error="handleImageError"
          v-if="network.logoUrl && !network.logoError"
        />
        
        <!-- Fallback for when image fails to load -->
        <div v-else 
             class="w-full h-full flex items-center justify-center rounded-md font-bold text-white text-lg sm:text-xl"
             :style="{ backgroundColor: network.color || '#6b7280' }">
          <span>{{ network.name?.charAt(0) || 'N' }}</span>
        </div>
        
        <!-- Selection Indicator -->
        <div v-if="selectedNetwork?.id === network.id" 
             class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
          <i class="pi pi-check text-xs text-white"></i>
        </div>
      </div>
      
      <!-- Network Name -->
      <div class="text-center">
        <span class="text-xs sm:text-sm font-medium text-gray-800 leading-tight">
          {{ network.name }}
        </span>
      </div>
    </div>
  </div>
</div>
            

              <!-- Beneficiary Number -->
              <div class="space-y-3">
                <label class="block text-sm font-semibold" style="color: #0d000a;">
                  <i class="pi pi-phone mr-2" style="color: #fedd00;"></i>
                  Beneficiary Phone Number
                </label>
                <div class="relative">
                  <input 
                    v-model="beneficiaryNumber"
                    type="tel"
                    placeholder="Enter phone number (e.g., 0201234567)"
                    class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-opacity-60"
                    style="background-color: #f3f2f2; border-color: #0d000a; color: #0d000a;"
                    :style="{
                      focusRingColor: '#fedd00',
                      focusBorderColor: '#fedd00'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'; $event.target.style.boxShadow = '0 0 0 2px rgba(254, 221, 0, 0.2)'"
                    @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'; $event.target.style.boxShadow = 'none'"
                  />
                  <div v-if="isValidNumber" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <i class="pi pi-check-circle text-green-500"></i>
                  </div>
                </div>
                <p v-if="numberError" class="text-sm text-red-500">{{ numberError }}</p>
              </div>

              <!-- Data Plan Selection -->
              <div class="space-y-3" v-if="selectedNetwork">
                <label class="block text-sm font-semibold" style="color: #0d000a;">
                  <i class="pi pi-server mr-2" style="color: #fedd00;"></i>
                  Select Data Plan
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div v-for="plan in selectedNetwork.plans" :key="plan.id"
                       @click="selectedPlan = plan"
                       class="cursor-pointer rounded-md border p-4 transition-all duration-200 hover:border-opacity-60"
                       :class="selectedPlan?.id === plan.id ? 'ring-2 ring-opacity-50' : ''"
                       :style="{
                         borderColor: selectedPlan?.id === plan.id ? '#fedd00' : 'rgba(13, 0, 10, 0.1)',
                         backgroundColor: selectedPlan?.id === plan.id ? 'rgba(254, 221, 0, 0.05)' : 'transparent',
                         ringColor: selectedPlan?.id === plan.id ? '#fedd00' : 'transparent'
                       }">
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h4 class="font-semibold text-sm" style="color: #0d000a;">{{ plan.value }}</h4>
                        <p class="text-xs opacity-60 mt-1" style="color: #0d000a;">{{ plan.duration }}</p>
                        <div class="mt-2">
                          <span class="text-lg font-bold" style="color: #0d000a;">GH₵{{ plan.base_price }}</span>
                        </div>
                      </div>
                      <div v-if="selectedPlan?.id === plan.id" 
                           class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                           style="background-color: #fedd00;">
                        <i class="pi pi-check text-xs" style="color: #0d000a;"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div class="w-full max-w-md mx-auto bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200
               rounded-md p-6" v-if="!isAuthenticated">
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <p class="text-gray-700 font-medium text-sm sm:text-base">Please login to complete purchase</p>
    </div>
    <RouterLink to="/auth/login" class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 
    to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white px-6 py-2.5 
    rounded-md font-semibold text-sm transition-all duration-200 transform hover:scale-105 
     hover:shadow-lg">
      Login
  </RouterLink>
  </div>
</div>
              <div class="pt-4">
                <button 
                  @click="purchaseWithPaystack"
                  :disabled="!canPurchase"
                  class="w-full py-4 rounded-md font-semibold text-center transition-all duration-200 
                  flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    backgroundColor: canPurchase ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                    color: '#0d000a'
                  }">
                  <i class="pi pi-shopping-cart mr-2"></i>
                  <span v-if="!processing">
                    {{ selectedPlan ? `Purchase for GH₵${selectedPlan.base_price}` : 'Select plan to continue' }}
                  </span>
                  <span v-else>Processing...</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Purchase Summary -->
        <div class="lg:col-span-1">
          <div class="rounded-md border border-opacity-20 overflow-hidden sticky top-8" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            
            <!-- Summary Header -->
            <div class="px-4 py-4 border-b border-opacity-10" style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h3 class="font-semibold tracking-tight" style="color: #0d000a; font-weight: 600;">Purchase Summary</h3>
            </div>

            <!-- Summary Content -->
            <div class="p-4 space-y-4">
              
              <!-- Network -->
              <div v-if="selectedNetwork" class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Network</span>
                <div class="flex items-center">
                  <div class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: selectedNetwork.color }"></div>
                  <span class="text-sm font-medium" style="color: #0d000a;">{{ selectedNetwork.name }}</span>
                </div>
              </div>

              <!-- Beneficiary -->
              <div v-if="beneficiaryNumber" class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Beneficiary</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ beneficiaryNumber }}</span>
              </div>

              <!-- Plan -->
              <div v-if="selectedPlan" class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Data Plan</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ selectedPlan.value }}</span>
              </div>

              <!-- Validity -->
              <div v-if="selectedPlan" class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Validity</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ selectedPlan.duration }}</span>
              </div>

              <!-- Divider -->
              <hr v-if="selectedPlan" class="border-opacity-10" style="border-color: #0d000a;">

              <!-- Total -->
              <div v-if="selectedPlan" class="flex items-center justify-between py-2">
                <span class="font-semibold" style="color: #0d000a;">Total Amount</span>
                <span class="text-lg font-bold" style="color: #0d000a;">GH₵{{ selectedPlan.base_price }}</span>
              </div>

             

              <!-- Empty State -->
              <div v-if="!selectedNetwork || !selectedPlan" class="text-center py-8">
                <i class="pi pi-info-circle text-3xl opacity-30 mb-3" style="color: #0d000a;"></i>
                <p class="text-sm opacity-60" style="color: #0d000a;">
                  Select network and plan to see summary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 

    <!-- Success Modal -->
    <OrderTicket 
      v-model="showSuccessModal"
      :order-data="orderData"
      @view-orders="navigateToOrders"
    />

     <TopUpModal 
      :isOpen="showTopUpModal" 
      @close="showTopUpModal = false"
     />
           

    <!-- Transaction History Modal -->
    <div v-if="showHistoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden" style="background-color: #f3f2f2;">
        <div class="px-6 py-4 border-b border-opacity-10 flex items-center justify-between" style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
          <h3 class="text-xl font-bold tracking-tight" style="color: #0d000a; font-weight: 700;">Transaction History</h3>
          <button @click="closeHistoryModal" class="text-gray-500 hover:text-gray-700">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <div v-if="transactionHistory.length === 0" class="text-center py-8">
            <i class="pi pi-history text-3xl opacity-30 mb-3" style="color: #0d000a;"></i>
            <p class="text-sm opacity-60" style="color: #0d000a;">No transactions yet</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="transaction in transactionHistory" :key="transaction.id" 
                 class="flex items-center justify-between p-4 rounded-lg border border-opacity-10"
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                     :style="{ backgroundColor: transaction.type === 'purchase' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)' }">
                  <i :class="transaction.type === 'purchase' ? 'pi pi-shopping-cart text-green-600' : 'pi pi-plus text-blue-600'"></i>
                </div>
                <div>
                  <p class="font-semibold text-sm" style="color: #0d000a;">{{ transaction.description }}</p>
                  <p class="text-xs opacity-60" style="color: #0d000a;">{{ transaction.date }}</p>
                </div>
              </div>
              <span class="font-bold text-sm" 
                    :style="{ color: transaction.type === 'purchase' ? '#ef4444' : '#22c55e' }">
                {{ transaction.type === 'purchase' ? '-' : '+' }}${{ transaction.amount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from "vue-router"
import PaystackPop from '@paystack/inline-js'
import LoginText from '../components/LoginText.vue'
import apiClient from "../api/axios"
import TopUpModal from '../components/TopUpModal.vue'
import WalletBalance from '../components/WalletBalance.vue'
import OrderTicket from '../components/OrderTicket.vue'

const authStore = useAuthStore()
const router = useRouter()


 const popup = new PaystackPop()

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isInitialized = computed(() => authStore.isInitialized);
const userType = computed(() => authStore.userType);
const userData = computed(() => authStore.userData)

// Reactive data
const currentBalance = ref(25750.50)
const selectedNetwork = ref(null)
const selectedPlan = ref(null)
const beneficiaryNumber = ref('')
const processing = ref(false)
const showSuccessModal = ref(false)
const showHistoryModal = ref(false)
const showTopUpModal = ref(false)
const orderData = ref(null)
// Sample transaction history
const transactionHistory = ref([

])

const toast = ref({
  show: false,
  type: 'success',
  message: ''
})

const showToast = (message, type = 'success') => {
  toast.value = { show: true, type, message }
  setTimeout(() => { toast.value.show = false }, 3000)
}


const networkMetadata = {
  mtn: { 
    color: '#FFD700',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/960px-New-mtn-logo.jpg',
  },
}
const networks = ref([
  {
    id: 1,
    name: 'MTN',
    color: '#FFD700',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/960px-New-mtn-logo.jpg',
      availability: true,
    plans: [
   
    ]
  },
 

])

// Computed properties
const isValidNumber = computed(() => {
  const phoneRegex = /^(\+233|0)[789]\d{9}$/
  return phoneRegex.test(beneficiaryNumber.value)
})

const ghanaPrefixes = [
  '024', '054', '055', '059', '053', // MTN
  '020', '050', // Vodafone
  '027', '057', '026', '056'  // AirtelTigo
]
const isValidPhone = computed(() => {
  // Remove all non-digits
  const cleanPhone = beneficiaryNumber.value.replace(/\D/g, '')
  
  // Check if it's 10 digits and starts with valid Ghana prefix
  if (cleanPhone.length === 10) {
    const prefix = cleanPhone.substring(0, 3)
    return ghanaPrefixes.includes(prefix)
  }
  
  return false
})

const numberError = computed(() => {
  if (beneficiaryNumber.value && !isValidPhone.value) {
    return 'Please enter a valid Ghanaian phone umber'
  }
  return ''
})



const canPurchase = computed(() => {
  return selectedNetwork.value && 
         selectedPlan.value && 
         isValidPhone.value && 
         isAuthenticated.value &&
         !processing.value
})

// Methods


const fetchNetworks = async () => {
   
      try{
          const response = await apiClient.get("/management/networks");
          networks.value = mapNetworksWithMetadata(response.data)
      }catch(err){

      }

}


const onSelectedNetwork = async (network) => {

    selectedNetwork.value = network
    if(!(network.plans.length == 0)) return
  try{
     
      const response = await apiClient.get(`/management/system/plans/${network.original_id}?audience=${userType.value}`);
      network.plans = response.data
  }catch(err){
     
  }

}

function mapNetworksWithMetadata(networks) {
  return networks.map((network, index) => {
    const networkKey = network.name.toLowerCase().replace(/\s+/g, '')
    const metadata = networkMetadata[networkKey] || {
      color: '#666666', 
      logoUrl: '' 
    }

    return {
      id: index + 1,
      name: network.name,
      color: metadata.color,
      logoUrl: metadata.logoUrl,
      is_active: network.is_active,
      original_id: network.id,
      plans: []
    }
  })
}


const openTopupModal = () => {
    showTopUpModal.value = !showTopUpModal.value;
}

const openTransactionHistory = () => {
  showHistoryModal.value = true
}

const closeHistoryModal = () => {
  showHistoryModal.value = false
}

const handleImageError = (event) => {
  // Hide the broken image and show fallback
  event.target.style.display = 'none'
  const network = networks.value.find(n => n.logoUrl === event.target.src)
  if (network) {
    network.logoError = true
  }
}



const navigateToOrders = () => {
  router.push('user/orders')
}

const purchaseWithPaystack = async () => {

  if(!canPurchase.value) return;

  processing.value = true
    
  try{
        
      const response = await apiClient.post("/payments/buy-bundle",
      {
      
        
           "plan_id": selectedPlan.value.id,
           "beneficiary_number": beneficiaryNumber.value,
           "external_id": "33729",
          "package_size": selectedPlan.value.value
        
      }
    )
    if(response.status == 200){
        // popup.resumeTransaction(response.data.data.access_code)
        orderData.value = response.data
        showSuccessModal.value = true;
    }
  }catch(error){
    if (error.status == 402){
      showToast('Insufficient balance. Please topup', 'error')
    }else if(error.status == 500){
      showToast("Something went wrong. Please try again later or contact support.", "error")
    }else if(error.status == 503){
      showToast("Service Unavailable. Please contact support.", "error")
    }
  }finally{
      processing.value = false
  }
  
}

const purchaseData = async () => {
  if (!canPurchase.value) return
  
  processing.value = true
  
  try {
   
    
    // Add transaction to history
    transactionHistory.value.unshift({
      id: Date.now(),
      type: 'purchase',
      description: `${selectedNetwork.value.name} ${selectedPlan.value.data} Data Bundle`,
      amount: selectedPlan.value.price,
      date: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    })
    
    // Deduct amount from balance
    currentBalance.value -= selectedPlan.value.price
    
    // Show success modal
    showSuccessModal.value = true
    
    // Reset form
    resetForm()
    
  } catch (error) {
    alert('Purchase failed. Please try again.')
  } finally {
    processing.value = false
  }
}

const resetForm = () => {
  selectedNetwork.value = null
  selectedPlan.value = null
  beneficiaryNumber.value = ''
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

// Watch for network changes to reset plan selection
watch(selectedNetwork, () => {
  selectedPlan.value = null
})

onMounted(() => fetchNetworks())
</script>

<style scoped>
/* Network Card Styles */
 .network-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 12px;
  padding: 20px 12px 16px 12px;
  border: 2px solid rgba(13, 0, 10, 0.1);
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.network-card:hover {
  border-color: rgba(254, 221, 0, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
} 

.network-card.selected {
  border-color: #fedd00;
  background-color: rgba(254, 221, 0, 0.05);
  box-shadow: 0 4px 20px rgba(254, 221, 0, 0.15);
}

/* Logo Container */
.network-logo-container {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 2px solid rgba(13, 0, 10, 0.05);
}

.network-card.selected .network-logo-container {
  border-color: rgba(254, 221, 0, 0.3);
  box-shadow: 0 3px 12px rgba(254, 221, 0, 0.2);
} 

/* Network Logo */
 .network-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.network-card:hover .network-logo {
  transform: scale(1.05);
}

/* Logo Fallback */
.network-logo-fallback {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
} 

/* .network-initials {
  font-size: 18px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
} */ 

/* Network Name */
.network-name {
  text-align: center;
  width: 100%;
}

.network-name span {
  font-size: 14px;
  font-weight: 600;
  color: #0d000a;
  letter-spacing: 0.025em;
}

.network-card.selected .network-name span {
  color: #0d000a;
  font-weight: 700;
}

/* Selection Indicator */
.selection-indicator {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fedd00;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #ffffff;
}

.selection-indicator i {
  font-size: 10px;
  color: #0d000a;
  font-weight: bold;
}

/* Custom breakpoint for xs (extra small) screens */
@media (min-width: 475px) {
  .xs\:flex-row {
    flex-direction: row;
  }
  
  .xs\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }
  
  .xs\:space-x-3 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.75rem * var(--tw-space-x-reverse));
    margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
  }
  
  .xs\:flex-none {
    flex: none;
  }
  
  .xs\:inline {
    display: inline;
  }
  
  .xs\:hidden {
    display: none;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .network-card {
    padding: 16px 8px 12px 8px;
  }
  
  .network-logo-container {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  
  .network-logo {
    width: 32px;
    height: 32px;
  }
  
  .network-logo-fallback {
    width: 32px;
    height: 32px;
  }
  
  .network-initials {
    font-size: 14px;
  }
  
  .network-name span {
    font-size: 12px;
  }
  
  .selection-indicator {
    width: 20px;
    height: 20px;
    top: -6px;
    right: -6px;
  }
  
  .selection-indicator i {
    font-size: 8px;
  }
}

/* Additional Mobile Optimization */
@media (max-width: 480px) {
  .network-logo-container {
    width: 45px;
    height: 45px;
    margin-bottom: 8px;
  }
  
  .network-logo {
    width: 28px;
    height: 28px;
  }
  
  .network-logo-fallback {
    width: 28px;
    height: 28px;
  }
  
  .network-initials {
    font-size: 12px;
  }
  
  .network-name span {
    font-size: 11px;
  }
}

/* Button hover effects */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Input focus styles */
input:focus {
  outline: none;
}

/* Custom scrollbar for mobile */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(254, 221, 0, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(254, 221, 0, 0.5);
}

/* Modal animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fixed {
  animation: fadeIn 0.2s ease-out;
}

/* Responsive header adjustments */
@media (max-width: 640px) {
  .order-last {
    order: 9999;
  }
  
  .sm\:order-first {
    order: -1;
  }
}

/* Enhanced button styles for better mobile experience */
@media (max-width: 475px) {
  button {
    min-height: 44px; /* Minimum touch target size */
    font-size: 14px;
  }
}
</style>