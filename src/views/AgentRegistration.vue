<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Become a Data Agent
          </h1>
          <p class="text-xl text-slate-300 leading-relaxed">
            Create your own branded storefront, set your own prices, and earn on every sale. Your business, your rules.
          </p>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid md:grid-cols-3 gap-8 mb-20">
        <!-- Feature 1 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-4">
            <i class="pi pi-globe text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Your Own Storefront</h3>
          <p class="text-slate-600">Get a unique branded page to showcase and sell data bundles with your custom pricing</p>
        </div>

        <!-- Feature 2 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl mb-4">
            <i class="pi pi-chart-line text-2xl text-green-600"></i>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Set Your Own Prices</h3>
          <p class="text-slate-600">Full control over pricing strategy - maximize your profits with flexible pricing</p>
        </div>

        <!-- Feature 3 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-purple-50 rounded-xl mb-4">
            <i class="pi pi-link text-2xl text-purple-600"></i>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Unique Link</h3>
          <p class="text-slate-600">Share your personalized link and track sales from your custom dashboard</p>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="relative">
            <div class="bg-slate-50 rounded-xl p-6 text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full text-slate-900 font-bold text-lg mb-4">
                1
              </div>
              <h4 class="font-semibold text-slate-900 mb-1">Register</h4>
              <p class="text-sm text-slate-600">Pay one-time fee</p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200"></div>
          </div>

          <div class="relative">
            <div class="bg-slate-50 rounded-xl p-6 text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full text-slate-900 font-bold text-lg mb-4">
                2
              </div>
              <h4 class="font-semibold text-slate-900 mb-1">Customize</h4>
              <p class="text-sm text-slate-600">Set your prices</p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200"></div>
          </div>

          <div class="relative">
            <div class="bg-slate-50 rounded-xl p-6 text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full text-slate-900 font-bold text-lg mb-4">
                3
              </div>
              <h4 class="font-semibold text-slate-900 mb-1">Share</h4>
              <p class="text-sm text-slate-600">Get your unique link</p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200"></div>
          </div>

          <div class="relative">
            <div class="bg-slate-50 rounded-xl p-6 text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full text-slate-900 font-bold text-lg mb-4">
                4
              </div>
              <h4 class="font-semibold text-slate-900 mb-1">Earn</h4>
              <p class="text-sm text-slate-600">Start making money</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <div class="max-w-md mx-auto">
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <!-- Form Header -->
          <div class="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-8 text-center border-b border-slate-200">
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Start Your Journey</h3>
            <p class="text-slate-600 mb-4">Join hundreds of successful agents</p>
            
            <div class="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
              <i class="pi pi-shield text-yellow-600 mr-2"></i>
              <div class="text-left">
                <div class="text-xs font-medium text-slate-600">One-time registration</div>
                <div class="text-xl font-bold text-slate-900">GH₵ 100.00</div>
              </div>
            </div>
          </div>

          <!-- Form Body -->
          <div class="px-8 py-8">
            <div class="space-y-6">
              <!-- Email -->
              <!-- <div>
                <label class="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address
                </label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="your.email@example.com"
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                  :class="{ 'border-red-400': emailError }"
                  @focus="handleInputFocus"
                  @blur="handleInputBlur"
                  required
                />
                <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
              </div> -->

              <!-- Terms -->
              <label class="flex items-start cursor-pointer group">
                <input
                  v-model="acceptTerms"
                  type="checkbox"
                  class="mt-1 w-4 h-4 border-2 border-slate-300 rounded focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <span class="ml-3 text-sm text-slate-600">
                  I agree to the 
                  <button type="button" class="text-slate-900 font-medium hover:underline">
                    Terms & Conditions
                  </button>
                  and 
                  <button type="button" class="text-slate-900 font-medium hover:underline">
                    Agent Agreement
                  </button>
                </span>
              </label>

              <!-- Submit Button -->
              <button
                @click="handleAgentRegistration"
                :disabled="!canRegister || isLoading"
                class="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 disabled:cursor-not-allowed text-slate-900 font-semibold py-4 rounded-lg transition flex items-center justify-center"
              >
                <div v-if="isLoading" class="flex items-center">
                  <div class="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
                <div v-else class="flex items-center">
                  <i class="pi pi-check mr-2"></i>
                  Pay GH₵ 100.00 & Register
                </div>
              </button>

              <p class="text-xs text-center text-slate-500">
                Secure payment • Instant activation • Full refund within 7 days
              </p>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <div class="flex-shrink-0">
            <i class="pi pi-check-circle text-green-600"></i>
          </div>
          <div class="ml-3">
            <h4 class="text-sm font-semibold text-green-900">Registration Successful!</h4>
            <p class="text-sm text-green-700 mt-1">
              Check your email for your unique storefront link and setup instructions.
            </p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="showError" class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <div class="ml-3">
            <h4 class="text-sm font-semibold text-red-900">Registration Failed</h4>
            <p class="text-sm text-red-700 mt-1">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Section -->
    <div class="bg-slate-50 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <p class="text-sm font-medium text-slate-600 mb-4">Trusted by agents nationwide</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import PaystackPop from '@paystack/inline-js'
import apiClient from '../api/axios'
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

const router = useRouter()
const popup = new PaystackPop()
const authStore = useAuthStore()

// Form data - Fixed the readonly issue by using separate refs
const email = ref('')
const acceptTerms = ref(false)

// UI state
const isLoading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Validation errors
const emailError = ref('')

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isInitialized = computed(() => authStore.isInitialized)

const canRegister = computed(() => {
         return acceptTerms.value 
})

// Methods
const validateEmail = () => {
  if (!email.value) {
    emailError.value = ''
    return
  }
  
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const handleInputFocus = () => {
  // Clear any previous messages when user starts typing
  showSuccess.value = false
  showError.value = false
}

const handleInputBlur = () => {
  // Validate fields on blur
  validateEmail()
}

const handleAgentRegistration = async () => {
  // Reset messages
  showSuccess.value = false
  showError.value = false
  
  // Final validation
  validateEmail()
  
  if (!canRegister.value) {
    errorMessage.value = 'Please fix all validation errors before submitting'
    showError.value = true
    return
  }

  isLoading.value = true

  try {
    const response = await apiClient.post("/payments/initialize", {
      "amount": 100, // Amount in smallest currency unit (e.g., kobo)
      "payment_for": "agent_reg"
    })
    
    // Success
    if(response.status == 200){
      popup.resumeTransaction(response.data.data.access_code)
      router.push('/')
    }
    
  } catch (error) {
    // Error
    errorMessage.value = 'Something went wrong. Please try again.'
    showError.value = true
  } finally {
    isLoading.value = false
  }
}

// Watchers for real-time validation
watch(email, validateEmail)

// Auto-hide messages after 5 seconds
watch(showSuccess, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  }
})

watch(showError, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showError.value = false
    }, 5000)
  }
})

// Set email from auth store if available
onMounted(() => {
  if (authStore.userData?.email) {
    email.value = authStore.userData.email
  }
})
</script>

<style scoped>
/* Custom focus styles for better UX */
input:focus {
  ring-width: 2px;
  ring-color: rgba(254, 221, 0, 0.5);
  border-color: #fedd00;
}

/* Smooth animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(254, 221, 0, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(254, 221, 0, 0.5);
}
</style>