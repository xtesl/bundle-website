<template>
  <div class="min-h-screen" style="background-color: #f3f2f2;">

    <!-- Header Section -->
    <div class="border-b" style="background-color: #0d000a; border-color: rgba(254, 221, 0, 0.2);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col space-y-4">
          <!-- Agent Info -->
          <div v-if="agentInfo" class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl"
                 style="background-color: #fedd00; color: #0d000a;">
              {{ agentInfo.name?.charAt(0) || 'A' }}
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight" style="color: #f3f2f2;">
                {{ agentInfo.name || 'Agent Store' }}
              </h1>
              <p class="mt-1 text-sm opacity-80 font-medium" style="color: #f3f2f2;">
                Purchase data bundles at agent prices
              </p>
            </div>
          </div>
          
          <!-- Loading State -->
          <div v-else class="animate-pulse flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gray-700"></div>
            <div class="flex-1">
              <div class="h-6 bg-gray-700 rounded w-48 mb-2"></div>
              <div class="h-4 bg-gray-700 rounded w-64"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Column: Purchase Form -->
        <div class="space-y-6">
          <!-- Network Selection Card -->
          <div class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h2 class="text-lg font-semibold tracking-tight flex items-center" style="color: #0d000a;">
                <i class="pi pi-wifi mr-2" style="color: #fedd00;"></i>
                Select Network
              </h2>
            </div>
            
            <div class="p-6">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div v-for="network in networks" :key="network.id"
                     @click="selectNetwork(network)"
                     class="relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                     :class="selectedNetwork?.id === network.id 
                       ? 'border-yellow-400 bg-yellow-50 shadow-md ring-2 ring-yellow-200' 
                       : 'border-gray-200 bg-white hover:border-gray-300'">
                  
                  <div class="relative w-full h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                    <img v-if="network.logoUrl" 
                         :src="network.logoUrl" 
                         :alt="network.name"
                         class="max-w-full max-h-full object-contain"
                    />
                    <div v-else 
                         class="w-full h-full flex items-center justify-center rounded-md font-bold text-white text-xl"
                         :style="{ backgroundColor: network.color }">
                      {{ network.name?.charAt(0) }}
                    </div>
                    
                    <div v-if="selectedNetwork?.id === network.id" 
                         class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <i class="pi pi-check text-xs text-white"></i>
                    </div>
                  </div>
                  
                  <div class="text-center">
                    <span class="text-sm font-medium text-gray-800">{{ network.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phone Number Card -->
          <div class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h2 class="text-lg font-semibold tracking-tight flex items-center" style="color: #0d000a;">
                <i class="pi pi-phone mr-2" style="color: #fedd00;"></i>
                Beneficiary Number
              </h2>
            </div>
            
            <div class="p-6">
              <div class="relative">
                <input 
                  v-model="beneficiaryNumber"
                  type="tel"
                  placeholder="0201234567"
                  class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all"
                  style="background-color: #f3f2f2; border-color: #0d000a; color: #0d000a;"
                  @focus="$event.target.style.borderColor = '#fedd00'; $event.target.style.boxShadow = '0 0 0 2px rgba(254, 221, 0, 0.2)'"
                  @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'; $event.target.style.boxShadow = 'none'"
                />
                <div v-if="isValidPhone" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <i class="pi pi-check-circle text-green-500"></i>
                </div>
              </div>
              <p v-if="numberError" class="text-sm text-red-500 mt-2">{{ numberError }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Data Plans & Summary -->
        <div class="space-y-6">
          <!-- Data Plans Card -->
          <div v-if="selectedNetwork" class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h2 class="text-lg font-semibold tracking-tight flex items-center" style="color: #0d000a;">
                <i class="pi pi-server mr-2" style="color: #fedd00;"></i>
                Available Plans
              </h2>
            </div>
            
            <div class="p-6 max-h-96 overflow-y-auto space-y-3">
              <div v-if="loadingPlans" class="space-y-3">
                <div v-for="n in 3" :key="n" class="animate-pulse">
                  <div class="h-20 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
              
              <div v-else-if="selectedNetwork.plans.length === 0" class="text-center py-8">
                <i class="pi pi-inbox text-3xl opacity-30 mb-3" style="color: #0d000a;"></i>
                <p class="text-sm opacity-60" style="color: #0d000a;">No plans available</p>
              </div>
              
              <div v-else
                   v-for="plan in selectedNetwork.plans" 
                   :key="plan.id"
                   @click="selectedPlan = plan"
                   class="cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md"
                   :class="selectedPlan?.id === plan.id ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200' : 'border-gray-200 bg-white hover:border-gray-300'">
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-semibold text-base" style="color: #0d000a;">{{ plan.value }}</h4>
                    <p class="text-xs opacity-60 mt-1" style="color: #0d000a;">{{ plan.duration }}</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-xl font-bold" style="color: #0d000a;">GH₵{{ plan.base_price }}</span>
                    <div v-if="selectedPlan?.id === plan.id" 
                         class="w-6 h-6 rounded-full flex items-center justify-center"
                         style="background-color: #fedd00;">
                      <i class="pi pi-check text-xs" style="color: #0d000a;"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Purchase Summary -->
          <div class="rounded-md border border-opacity-20 overflow-hidden sticky top-8" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h3 class="text-lg font-semibold tracking-tight" style="color: #0d000a;">Order Summary</h3>
            </div>

            <div class="p-6 space-y-4">
              <div v-if="selectedNetwork" class="flex justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Network</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ selectedNetwork.name }}</span>
              </div>

              <div v-if="beneficiaryNumber && isValidPhone" class="flex justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Number</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ beneficiaryNumber }}</span>
              </div>

              <div v-if="selectedPlan" class="flex justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Data</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ selectedPlan.value }}</span>
              </div>

              <div v-if="selectedPlan" class="flex justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Validity</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ selectedPlan.duration }}</span>
              </div>

              <hr v-if="selectedPlan" class="border-opacity-10" style="border-color: #0d000a;">

              <div v-if="selectedPlan" class="flex justify-between py-2">
                <span class="font-semibold" style="color: #0d000a;">Total</span>
                <span class="text-xl font-bold" style="color: #0d000a;">GH₵{{ selectedPlan.base_price }}</span>
              </div>

              <div v-if="!selectedNetwork || !selectedPlan" class="text-center py-8">
                <i class="pi pi-shopping-cart text-3xl opacity-30 mb-3" style="color: #0d000a;"></i>
                <p class="text-sm opacity-60" style="color: #0d000a;">
                  Complete the form to see summary
                </p>
              </div>

              <button 
                @click="purchaseData"
                :disabled="!canPurchase"
                class="w-full py-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                :style="{
                  backgroundColor: canPurchase ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                  color: '#0d000a'
                }">
                <i class="pi pi-shopping-cart mr-2"></i>
                <span v-if="!processing">
                  {{ selectedPlan ? `Purchase for GH₵${selectedPlan.base_price}` : 'Complete form' }}
                </span>
                <span v-else>Processing...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="rounded-xl shadow-2xl max-w-md w-full" style="background-color: #f3f2f2;">
        <div class="p-6 text-center">
          <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
               style="background-color: rgba(34, 197, 94, 0.1);">
            <i class="pi pi-check text-2xl text-green-600"></i>
          </div>
          <h3 class="text-xl font-bold mb-2" style="color: #0d000a;">Purchase Successful!</h3>
          <p class="text-sm opacity-70 mb-6" style="color: #0d000a;">
            Data bundle sent to {{ beneficiaryNumber }}
          </p>
          <button @click="closeSuccessModal" 
                  class="w-full py-3 rounded-lg font-semibold"
                  style="background-color: #fedd00; color: #0d000a;">
            Done
          </button>
        </div>
      </div>
    </div>

    <!-- Top Up Modal -->
    <div v-if="showTopUpModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.5);" @click.self="showTopUpModal = false">
      <div class="rounded-xl shadow-2xl max-w-md w-full" style="background-color: #f3f2f2;">
        <div class="px-6 py-4 border-b border-opacity-10 flex items-center justify-between" 
             style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
          <h3 class="text-xl font-bold tracking-tight" style="color: #0d000a;">Top Up Wallet</h3>
          <button @click="showTopUpModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold mb-2" style="color: #0d000a;">Amount (GH₵)</label>
              <input 
                v-model="topUpAmount"
                type="number"
                placeholder="Enter amount"
                class="w-full px-4 py-3 rounded-md border border-opacity-20"
                style="background-color: #f3f2f2; border-color: #0d000a; color: #0d000a;"
              />
            </div>
            <button 
              @click="processTopUp"
              :disabled="!topUpAmount || topUpAmount <= 0"
              class="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
              style="background-color: #fedd00; color: #0d000a;">
              Confirm Top Up
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction History Modal -->
    <div v-if="showHistoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.5);" @click.self="showHistoryModal = false">
      <div class="rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden" style="background-color: #f3f2f2;">
        <div class="px-6 py-4 border-b border-opacity-10 flex items-center justify-between" 
             style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
          <h3 class="text-xl font-bold tracking-tight" style="color: #0d000a;">Transaction History</h3>
          <button @click="showHistoryModal = false" class="text-gray-500 hover:text-gray-700">
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
                     :style="{ backgroundColor: transaction.type === 'purchase' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)' }">
                  <i :class="transaction.type === 'purchase' ? 'pi pi-shopping-cart text-red-600' : 'pi pi-plus text-green-600'"></i>
                </div>
                <div>
                  <p class="font-semibold text-sm" style="color: #0d000a;">{{ transaction.description }}</p>
                  <p class="text-xs opacity-60" style="color: #0d000a;">{{ transaction.date }}</p>
                </div>
              </div>
              <span class="font-bold text-sm" 
                    :style="{ color: transaction.type === 'purchase' ? '#ef4444' : '#22c55e' }">
                {{ transaction.type === 'purchase' ? '-' : '+' }}GH₵{{ transaction.amount }}
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
import { useRoute } from 'vue-router'
import apiClient from "../api/axios"
import PaystackPop from '@paystack/inline-js'



const popup = new PaystackPop()
const route = useRoute()
const slug = computed(() => route.params.slug)

const agentInfo = ref(null)
const networks = ref([])
const selectedNetwork = ref(null)
const selectedPlan = ref(null)
const beneficiaryNumber = ref('')
const processing = ref(false)
const loadingPlans = ref(false)
const showSuccessModal = ref(false)
const showTopUpModal = ref(false)
const showHistoryModal = ref(false)
const walletBalance = ref(0)
const transactionHistory = ref([])
const topUpAmount = ref('')

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

const ghanaPrefixes = ['024', '054', '055', '059', '053', '020', '050', '027', '057', '026', '056']

const isValidPhone = computed(() => {
  const cleanPhone = beneficiaryNumber.value.replace(/\D/g, '')
  if (cleanPhone.length === 10) {
    const prefix = cleanPhone.substring(0, 3)
    return ghanaPrefixes.includes(prefix)
  }
  return false
})

const numberError = computed(() => {
  if (beneficiaryNumber.value && !isValidPhone.value) {
    return 'Please enter a valid Ghanaian phone number'
  }
  return ''
})

const canPurchase = computed(() => {
  return selectedNetwork.value && 
         selectedPlan.value && 
         isValidPhone.value && 
         !processing.value
})

const fetchAgentInfo = async () => {
  try {
    const response = await apiClient.get(`/management/storefronts/${slug.value}`)
    agentInfo.value = response.data
    // Fetch wallet balance
    await fetchWalletBalance()
  } catch (error) {
    console.error('Error fetching agent info:', error)
  }
}

const fetchWalletBalance = async () => {
  try {
    // const response = await apiClient.get('/users/wallet/read')
    // walletBalance.value = response.data.balance || 0
  } catch (error) {
    // console.error('Error fetching wallet balance:', error)
  }
}

const fetchTransactionHistory = async () => {
  try {
    // const response = await apiClient.get('/transactions/history')
    // transactionHistory.value = response.data || []
  } catch (error) {
    // console.error('Error fetching transaction history:', error)
  }
}

const fetchNetworks = async () => {
  try {
    const response = await apiClient.get("/management/networks")
    networks.value = response.data.map((network, index) => {
      const networkKey = network.name.toLowerCase().replace(/\s+/g, '')
      const metadata = networkMetadata[networkKey] || { color: '#666666', logoUrl: '' }
      
      return {
        id: index + 1,
        name: network.name,
        color: metadata.color,
        logoUrl: metadata.logoUrl,
        original_id: network.id,
        plans: []
      }
    })
  } catch (error) {
    // console.error('Error fetching networks:', error)
  }
}

const selectNetwork = async (network) => {
  selectedNetwork.value = network
  selectedPlan.value = null
  
  if (network.plans.length > 0) return
  
  loadingPlans.value = true
  try {
    const response = await apiClient.get(`/management/creator/plans/${network.original_id}?audience=regular`)
    network.plans = response.data
  } catch (error) {
    console.error('Error fetching plans:', error)
  } finally {
    loadingPlans.value = false
  }
}

const purchaseData = async () => {
  if (!canPurchase.value) return
  
  processing.value = true
  
  try {
    const response = await apiClient.post("/payments/initialize-agent-purchase", {
      payment_for: "buy-bundle",
      plan_id:  selectedPlan.value.id,
      beneficiary_number: beneficiaryNumber.value
    })
    
    if (response.status === 200) {
      popup.resumeTransaction(response.data.data.access_code)
      // showSuccessModal.value = true
      // await fetchWalletBalance()
      // await fetchTransactionHistory()
      // resetForm()
    }
  } catch (error) {
    alert('Purchase failed. Please try again.')
  } finally {
    processing.value = false
  }
}

const processTopUp = async () => {
  if (!topUpAmount.value || topUpAmount.value <= 0) return
  
  try {
    const response = await apiClient.post('/wallet/topup', {
      amount: topUpAmount.value
    })
    
    if (response.status === 200) {
      await fetchWalletBalance()
      await fetchTransactionHistory()
      topUpAmount.value = ''
      showTopUpModal.value = false
      alert('Top-up successful!')
    }
  } catch (error) {
    console.error('Top-up error:', error)
    alert('Top-up failed. Please try again.')
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

watch(selectedNetwork, () => {
  selectedPlan.value = null
})

watch(showHistoryModal, (newVal) => {
  if (newVal) {
    fetchTransactionHistory()
  }
})

onMounted(() => {
  fetchAgentInfo()
  fetchNetworks()
})
</script>

<style scoped>
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

input:focus {
  outline: none;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(254, 221, 0, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(254, 221, 0, 0.5);
}

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
</style>