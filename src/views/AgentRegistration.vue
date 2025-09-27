<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #0d000a 0%, #2d1b23 50%, #0d000a 100%);">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #fedd00 2px, transparent 2px), radial-gradient(circle at 75% 75%, #fedd00 2px, transparent 2px); background-size: 60px 60px;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Header Section -->
      <div class="text-center mb-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" 
             style="background: linear-gradient(135deg, #fedd00 0%, #f4d03f 100%); box-shadow: 0 10px 25px rgba(254, 221, 0, 0.3);">
          <i class="pi pi-briefcase text-3xl" style="color: #0d000a; font-weight: bold;"></i>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4" style="color: #f3f2f2; letter-spacing: -0.025em;">
          Become an Agent
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Join our network of successful agents and start earning rewards by selling data bundles and growing your team
        </p>
      </div>

      <!-- Achievement Tiers with Thread Design -->
      <div class="mb-16">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-12" style="color: #f3f2f2;">
          Achievement Tiers & Rewards
        </h2>
        
        <!-- Thread Container -->
        <div class="relative max-w-5xl mx-auto">
          <!-- Connection Thread -->
          <div class="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full opacity-30"></div>
          <div class="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-full"></div>
          
          <!-- Achievement Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <!-- Tier A -->
            <div class="relative">
              <!-- Thread Node -->
              <div class="hidden md:block absolute top-20 left-1/2 
              transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 
              rounded-full border-4 border-gray-900 z-10 shadow-lg"></div>
              
              <div class="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-md p-6 border-yellow-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <!-- Tier Badge -->
                <div class="flex items-center justify-center w-12 h-12
                 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mb-4 mx-auto">
                  <span class="text-xl font-bold text-white">A</span>
                </div>
                
                <h3 class="text-lg font-bold text-gray-800 text-center mb-4">Bronze Agent</h3>
                
                <!-- Requirements -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center">
                    <i class="pi pi-database text-blue-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Sell 10 GB bundles</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-users text-green-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Refer 5 agents</span>
                  </div>
                </div>
                
                <!-- Reward -->
                <div class="text-center bg-white rounded-lg p-4 border-yellow-200">
                  <div class="text-2xl font-bold text-green-600">50 GH₵</div>
                  <div class="text-xs text-gray-500 mt-1">Monthly Reward</div>
                </div>
              </div>
            </div>

            <!-- Tier B -->
            <div class="relative">
              <!-- Thread Node -->
              <div class="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border-4 border-gray-900 z-10 shadow-lg"></div>
              
              <div class="bg-gradient-to-br from-gray-50 to-slate-100 rounded-md p-6 border-1 border-gray-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <!-- Tier Badge -->
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mb-4 mx-auto">
                  <span class="text-xl font-bold text-white">B</span>
                </div>
                
                <h3 class="text-lg font-bold text-gray-800 text-center mb-4">Silver Agent</h3>
                
                <!-- Requirements -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center">
                    <i class="pi pi-database text-blue-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Sell 15 GB bundles</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-users text-green-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Refer 9 agents</span>
                  </div>
                </div>
                
                <!-- Reward -->
                <div class="text-center bg-white rounded-lg p-4 border-gray-300">
                  <div class="text-2xl font-bold text-green-600">100 GH₵</div>
                  <div class="text-xs text-gray-500 mt-1">Monthly Reward</div>
                </div>
              </div>
            </div>

            <!-- Tier C -->
            <div class="relative">
              <!-- Thread Node -->
              <div class="hidden md:block absolute top-20 
              left-1/2 transform -translate-x-1/2 w-12 h-12 
              bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-gray-900 z-10 shadow-lg"></div>
              
              <div class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-md
               p-6 border-yellow-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <!-- Tier Badge -->
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4 mx-auto">
                  <span class="text-xl font-bold text-white">C</span>
                </div>
                
                <h3 class="text-lg font-bold text-gray-800 text-center mb-4">Gold Agent</h3>
                
                <!-- Requirements -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center">
                    <i class="pi pi-database text-blue-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Sell 25 GB bundles</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-users text-green-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Refer 17 agents</span>
                  </div>
                </div>
                
                <!-- Reward -->
                <div class="text-center bg-white rounded-lg p-4 border-yellow-400">
                  <div class="text-2xl font-bold text-green-600">200 GH₵</div>
                  <div class="text-xs text-gray-500 mt-1">Monthly Reward</div>
                </div>
              </div>
            </div>

            <!-- Tier D -->
            <div class="relative">
              <!-- Thread Node -->
              <div class="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full border-4 border-gray-900 z-10 shadow-lg">
                <div class="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <i class="pi pi-crown text-white text-lg"></i>
                </div>
              </div>
              
              <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-md p-6 border-purple-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <!-- Tier Badge -->
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br 
                from-purple-500 to-purple-700 rounded-full mb-4 mx-auto">
                  <span class="text-xl font-bold text-white">D</span>
                </div>
                
                <h3 class="text-lg font-bold text-gray-800 text-center mb-4">Diamond Agent</h3>
                
                <!-- Requirements -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center">
                    <i class="pi pi-database text-blue-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Sell 32 GB bundles</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-users text-green-500 mr-3"></i>
                    <span class="text-sm text-gray-700">Refer 25 agents</span>
                  </div>
                </div>
                
                <!-- Reward -->
                <div class="text-center bg-white rounded-lg p-4 border-purple-300">
                  <div class="text-2xl font-bold text-green-600">350 GH₵</div>
                  <div class="text-xs text-gray-500 mt-1">Monthly Reward</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="text-center p-6 rounded-md" style="background-color: rgba(243, 242, 242, 0.1); border: 1px solid rgba(254, 221, 0, 0.2);">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
            <i class="pi pi-chart-line text-2xl text-blue-400"></i>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Flexible Income</h3>
          <p class="text-gray-300 text-sm">Earn money on your own schedule with unlimited earning potential</p>
        </div>

        <div class="text-center p-6 rounded-md" style="background-color: rgba(243, 242, 242, 0.1); border: 1px solid rgba(254, 221, 0, 0.2);">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
            <i class="pi pi-users text-2xl text-green-400"></i>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Build Your Network</h3>
          <p class="text-gray-300 text-sm">Grow your team and earn from their success through our referral program</p>
        </div>

        <div class="text-center p-6 rounded-md" style="background-color: rgba(243, 242, 242, 0.1); border: 1px solid rgba(254, 221, 0, 0.2);">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center">
            <i class="pi pi-shield text-2xl text-purple-400"></i>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Full Support</h3>
          <p class="text-gray-300 text-sm">Get training, marketing materials, and dedicated support to succeed</p>
        </div>
      </div>

      <!-- Registration Form -->
      <div class="max-w-md mx-auto">
        <div class="backdrop-blur-sm border-opacity-20 rounded-md overflow-hidden" 
             style="background-color: rgba(243, 242, 242, 0.95); border-color: rgba(254, 221, 0, 0.3); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          
          <div class="px-8 pt-8 pb-6 text-center">
            <h2 class="text-2xl font-bold tracking-tight mb-2" style="color: #0d000a;">Start Your Journey</h2>
            <p class="text-sm opacity-70 font-medium" style="color: #0d000a;">Create your agent account and begin earning</p>
            
            <!-- Registration Fee Badge -->
            <div class="mt-4 inline-flex items-center px-4 py-2 rounded-md" 
                 style="background: linear-gradient(135deg, rgba(254, 221, 0, 0.1) 0%, rgba(254, 221, 0, 0.2) 100%); border-color: #fedd00;">
              <i class="pi pi-wallet text-lg mr-2" style="color: #fedd00;"></i>
              <span class="text-sm font-bold" style="color: #0d000a;">One-time Registration Fee: </span>
              <span class="text-lg font-bold ml-1" style="color: #fedd00;">25 GH₵</span>
            </div>
          </div>

          <!-- Form Content -->
          <div class="px-8 pb-8">
            <form @submit.prevent="handleAgentRegistration" class="space-y-6">
              
              <!-- Email Field -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
                  <i class="pi pi-envelope mr-2" style="color: #fedd00;"></i>
                  Email Address
                </label>
                <div class="relative">
                  <input 
                    v-model="agentForm.email"
                    type="email"
                    :disabled="true"
                    placeholder=""
                    class="w-full px-4 py-4 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 pl-12"
                    style="background-color: rgba(243, 242, 242, 0.8); border-color: rgba(13, 0, 10, 0.1); color: #0d000a;"
                    :class="{ 'border-red-400': emailError }"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                    required
                  />
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i class="pi pi-envelope text-lg opacity-50" style="color: #0d000a;"></i>
                  </div>
                </div>
                <p v-if="emailError" class="text-sm text-red-500 font-medium">{{ emailError }}</p>
              </div>


              <!-- Terms Agreement -->
              <div class="space-y-4">
                <label class="flex items-start cursor-pointer group">
                  <input 
                    v-model="agentForm.acceptTerms"
                    type="checkbox" 
                    class="sr-only"
                    required
                  />
                  <div class="relative mt-1">
                    <div class="w-5 h-5 rounded border-1 transition-all duration-200 group-hover:border-opacity-60"
                         :style="{
                           backgroundColor: agentForm.acceptTerms ? '#fedd00' : 'transparent',
                           borderColor: agentForm.acceptTerms ? '#fedd00' : 'rgba(13, 0, 10, 0.3)'
                         }">
                      <i v-if="agentForm.acceptTerms" 
                         class="pi pi-check absolute inset-0 flex items-center justify-center text-xs" 
                         style="color: #0d000a; font-weight: bold;"></i>
                    </div>
                  </div>
                  <div class="ml-3 text-sm leading-relaxed" style="color: #0d000a;">
                    <span class="font-medium">I agree to the Agent </span>
                    <button type="button" class="font-semibold hover:underline" style="color: #fedd00;">Terms & Conditions</button>
                    <span class="font-medium"> and </span>
                    <button type="button" class="font-semibold hover:underline" style="color: #fedd00;">Commission Structure</button>
                  </div>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button 
                  type="submit"
                  :disabled="!canRegister || isLoading"
                  class="w-full py-4 rounded-md font-bold text-lg tracking-wide transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                  :style="{
                    backgroundColor: canRegister && !isLoading ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                    color: '#0d000a',
                    boxShadow: canRegister && !isLoading ? '0 10px 25px rgba(254, 221, 0, 0.3)' : 'none'
                  }"
                >
                  <div v-if="isLoading" class="flex items-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-2 border-opacity-30 mr-3" 
                         style="border-color: #0d000a; border-top-color: transparent;"></div>
                    <span>Processing Payment...</span>
                  </div>
                  <div v-else class="flex items-center">
                    <i class="pi pi-credit-card mr-3 text-lg"></i>
                    <span>Pay 25 GH₵ & Become Agent</span>
                  </div>
                </button>
                
                <!-- Payment Info -->
                <div class="mt-3 text-center">
                  <p class="text-xs opacity-60" style="color: #0d000a;">
                    <i class="pi pi-shield mr-1" style="color: #fedd00;"></i>
                    Secure payment • Instant activation • Money-back guarantee
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
          <div class="flex items-center">
            <i class="pi pi-check-circle text-green-500 text-lg mr-3"></i>
            <div>
              <h3 class="text-sm font-semibold text-green-800">Registration Successful!</h3>
              <p class="text-sm text-green-600 mt-1">Welcome to our agent network. Check your email for next steps.</p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="showError" class="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
          <div class="flex items-center">
            <i class="pi pi-exclamation-triangle text-red-500 text-lg mr-3"></i>
            <div>
              <h3 class="text-sm font-semibold text-red-800">Registration Failed</h3>
              <p class="text-sm text-red-600 mt-1">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import PaystackPop from '@paystack/inline-js'
import apiClient from '../api/axios'
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

export default {
  name: 'AgentRegistration',
  setup() {
    // Form data
    const agentForm = ref({
      email: '',
      password: '',
      acceptTerms: false
    })

    const router = useRouter()

    const popup = new PaystackPop()

    const authStore = useAuthStore()

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isInitialized = computed(() => authStore.isInitialized);
    agentForm.value.email = computed(() => authStore.userData.email);
    // UI state
    const showPassword = ref(false)
    const isLoading = ref(false)
    const showSuccess = ref(false)
    const showError = ref(false)
    const errorMessage = ref('')

    // Validation errors
    const emailError = ref('')
    const passwordError = ref('')

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    // Computed properties
    const canRegister = computed(() => {
      return agentForm.value.email && 
             agentForm.value.acceptTerms && 
             !emailError.value 
    })

    // Methods
    const validateEmail = () => {
      if (!agentForm.value.email) {
        emailError.value = ''
        return
      }
      
      if (!emailRegex.test(agentForm.value.email)) {
        emailError.value = 'Please enter a valid email address'
      } else {
        emailError.value = ''
      }
    }

    const validatePassword = () => {
      if (!agentForm.value.password) {
        passwordError.value = ''
        return
      }

      if (agentForm.value.password.length < 8) {
        passwordError.value = 'Password must be at least 8 characters long'
      } else if (!passwordRegex.test(agentForm.value.password)) {
        passwordError.value = 'Password must contain uppercase, lowercase, and number'
      } else {
        passwordError.value = ''
      }
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleInputFocus = () => {
      // Clear any previous messages when user starts typing
      showSuccess.value = false
      showError.value = false
    }

    const handleInputBlur = () => {
      // Validate fields on blur
      validateEmail()
      validatePassword()
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
            "email": agentForm.value.email,
            "amount": "2500", // Amount in smallest currency unit (e.g., kobo)
            "payment_for": "agent-reg"
        })
        
        // Success
        
        if(response.status == 200){
            popup.resumeTransaction(response.data.data.access_code)
            router.push('/')
        }
        
        
      } catch (error) {
        // Error
        errorMessage.value = error.message || 'Something went wrong. Please try again.'
        showError.value = true
      } finally {
        isLoading.value = false
      }
    }

    // Watchers for real-time validation
    watch(() => agentForm.value.email, validateEmail)
    watch(() => agentForm.value.password, validatePassword)

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

    // Lifecycle
    onMounted(() => {
      // You could load any initial data here
      console.log('Agent Registration component mounted')
    })

    return {
      // Form data
      agentForm,
      
      // UI state
      showPassword,
      isLoading,
      showSuccess,
      showError,
      errorMessage,
      
      // Validation
      emailError,
      passwordError,
      canRegister,
      
      // Methods
      togglePassword,
      handleInputFocus,
      handleInputBlur,
      handleAgentRegistration
    }
  }
}
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