<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click.self="close"
  >
    <!-- Modal Container -->
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
      
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
            <i class="pi pi-wallet text-slate-900 text-lg"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Top Up Wallet</h3>
            <p class="text-sm text-slate-300">Add funds to your account</p>
          </div>
        </div>
        <button 
          @click="close"
          class="text-slate-400 hover:text-white transition"
        >
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        
        <!-- Quick Amount Buttons -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-slate-700 mb-3">
            Quick Select
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="quickAmount in quickAmounts"
              :key="quickAmount"
              @click="selectQuickAmount(quickAmount)"
              :class="amount === quickAmount ? 'bg-yellow-400 text-slate-900 border-yellow-400' : 'bg-white text-slate-700 border-slate-300 hover:border-yellow-400'"
              class="py-3 px-4 rounded-lg border-2 font-semibold transition"
            >
              GH₵ {{ quickAmount }} 
            </button>
          </div>
        </div>

        <!-- Amount Input -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            Or Enter Custom Amount
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">
              GH₵
            </span>
            <input
              v-model.number="amount"
              type="number"
              min="1"
              step="1"
              placeholder="0.00"
              class="w-full pl-14 pr-4 py-4 border-2 border-slate-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition text-lg font-semibold"
              :class="{ 'border-red-400': amountError }"
              @input="validateAmount"
            />
          </div>
          <p v-if="amountError" class="text-sm text-red-500 mt-2">{{ amountError }}</p>
          <p v-else class="text-xs text-slate-500 mt-2">Minimum amount: GH₵ 10</p>
        </div>

        <!-- Summary Card -->
        <div class="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-slate-600">Amount</span>
            <span class="text-lg font-bold text-slate-900">GH₵ {{ amount || 0 }} </span>
          </div>
          <!-- <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-slate-600">Processing Fee</span>
            <span class="text-sm font-semibold text-slate-700">GH₵ {{ processingFee }} </span>
          </div> -->
          <div class="h-px bg-slate-300 my-3"></div>
          <div class="flex items-center justify-between">
            <span class="text-base font-semibold text-slate-900">Total</span>
            <span class="text-2xl font-bold text-yellow-600">GH₵ {{ totalAmount }} </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button
            @click="close"
            class="flex-1 py-3 px-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            @click="handleTopUp"
            :disabled="!canProceed || isLoading"
            class="flex-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg transition flex items-center justify-center"
          >
            <div v-if="isLoading" class="flex items-center">
              <div class="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
            <span v-else>Proceed to Payment</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import apiClient from "../api/axios"
import PaystackPop from '@paystack/inline-js'


// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

 const popup = new PaystackPop()

// Emits
const emit = defineEmits(['close', 'topup'])

// Data
const amount = ref(null)
const amountError = ref('')
const isLoading = ref(false)
const quickAmounts = [10, 20, 50, 100, 200, 500]

// Computed
// const processingFee = computed(() => {
//   if (!amount.value) return 0
//   return (amount.value * 0.015).toFixed(2) // 1.5% fee
// })

const totalAmount = computed(() => {
  if (!amount.value) return 0
  return (parseFloat(amount.value)).toFixed(2)
})

const canProceed = computed(() => {
  return amount.value >= 10 && !amountError.value
})

// Methods
const validateAmount = () => {
  if (!amount.value) {
    amountError.value = ''
    return
  }
  
  if (amount.value < 10) {
    amountError.value = 'Minimum top up amount is 10 GH₵'
  } else if (amount.value > 10000) {
    amountError.value = 'Maximum top up amount is 10,000 GH₵'
  } else {
    amountError.value = ''
  }
}

const selectQuickAmount = (quickAmount) => {
  amount.value = quickAmount
  validateAmount()
}

const close = () => {
  amount.value = null
  amountError.value = ''
  emit('close')
}

const handleTopUp = async () => {
  if (!canProceed.value) return

  isLoading.value = true;
  try{
      
     const response = await apiClient.post("/payments/initialize",
          {
            "amount": totalAmount.value,
            "payment_for": "topup",
          }
        )

    if(response.status == 200){
           popup.resumeTransaction(response.data.data.access_code)
       }

  }catch(error){
    // console.log(error)
  }finally{

   isLoading.value = false;
  }
  
//   emit('topup', {
//     amount: amount.value,
//     processingFee: processingFee.value,
//     totalAmount: totalAmount.value
//   })
}

// Watchers
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    amount.value = null
    amountError.value = ''
  }
})
</script>