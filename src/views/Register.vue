<template>
  <div class="min-h-screen flex items-center justify-center py-12" style="background: linear-gradient(135deg, #0d000a 0%, #2d1b23 50%, #0d000a 100%);">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #fedd00 2px, transparent 2px), radial-gradient(circle at 75% 75%, #fedd00 2px, transparent 2px); background-size: 60px 60px;"></div>
    </div>

    <!-- Signup Container -->
    <div class="relative w-full max-w-4xl sm:mx-auto">
      <!-- Signup Card -->
      <div class="backdrop-blur-sm border border-opacity-20 rounded-md overflow-hidden" 
           style="background-color: rgba(243, 242, 242, 0.95); border-color: rgba(254, 221, 0, 0.3); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
        
        <!-- Header Section -->
        <div class="px-8 pt-8 pb-6 text-center">
          <!-- Logo/Brand -->
          <div class="w-20 h-20 mx-auto mb-6 rounded-md flex items-center justify-center" 
               style="background: linear-gradient(135deg, #fedd00 0%, #f4d03f 100%); box-shadow: 0 10px 25px rgba(254, 221, 0, 0.3);">
            <i class="pi pi-user-plus text-3xl" style="color: #0d000a; font-weight: bold;"></i>
          </div>
          
          <h1 class="text-3xl font-bold tracking-tight mb-2" style="color: #0d000a; font-weight: 700;">Create Account</h1>
          <p class="text-sm opacity-70 font-medium" style="color: #0d000a;">Join us to manage your data bundles easily</p>
        </div>

        <!-- Form Section -->
        <div class="px-8 pb-8">
          <form @submit.prevent="handleSignup" class="space-y-6">
            
            <!-- Email Field -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-envelope mr-2" style="color: #fedd00;"></i>
                Email Address
              </label>
              <div class="relative">
                <input 
                  v-model="signupForm.email"
                  type="email"
                  placeholder="Enter your email address"
                  class="w-full px-4 py-4 rounded-md border-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 pl-12"
                  style="background-color: rgba(243, 242, 242, 0.8); border-color: rgba(13, 0, 10, 0.1); color: #0d000a; font-size: 16px;"
                  :class="{ 'border-red-400': emailError }"
                  @focus="handleInputFocus"
                  @blur="handleInputBlur"
                  required
                />
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <i class="pi pi-envelope text-lg opacity-50" style="color: #0d000a;"></i>
                </div>
                <div v-if="isValidEmail && signupForm.email" class="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <i class="pi pi-check-circle text-green-500 text-lg"></i>
                </div>
              </div>
              <p v-if="emailError" class="text-sm text-red-500 font-medium">{{ emailError }}</p>
            </div>

            <!-- Phone Number Field (Ghana Only) -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-phone mr-2" style="color: #fedd00;"></i>
                Phone Number
                <span class="text-xs opacity-60 font-normal ml-1">(Ghana only)</span>
              </label>
              <div class="relative">
                <!-- Country Code Prefix -->
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div class="flex items-center">
                    <!-- Ghana Flag -->
                    <div class="w-6 h-4 rounded-sm mr-2 overflow-hidden" 
                         style="background: linear-gradient(to right, #ce1126 0%, #ce1126 33%, #fcd116 33%, #fcd116 66%, #006b3f 66%, #006b3f 100%); border: 1px solid rgba(0,0,0,0.1);">
                      <div class="w-2 h-2 bg-black rounded-full mx-auto mt-0.5" style="width: 4px; height: 4px;"></div>
                    </div>
                    <span class="text-sm font-medium opacity-70" style="color: #0d000a;">+233</span>
                    <div class="w-px h-4 mx-2 opacity-30" style="background-color: #0d000a;"></div>
                  </div>
                </div>
                
                <input 
                  v-model="signupForm.phone"
                  type="tel"
                  placeholder="050 123 4567"
                  class="w-full px-4 py-4 rounded-md border-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style="background-color: rgba(243, 242, 242, 0.8); border-color: rgba(13, 0, 10, 0.1); color: #0d000a; font-size: 
                  16px; padding-left: 100px;"
                  :class="{ 'border-red-400': phoneError }"
                  @focus="handleInputFocus"
                  @blur="handleInputBlur"
                  @input="formatPhoneNumber"
                  maxlength="12"
                  required
                />
                <div v-if="isValidPhone && signupForm.phone" class="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <i class="pi pi-check-circle text-green-500 text-lg"></i>
                </div>
              </div>
              <div class="flex items-start space-x-2 text-xs opacity-60" style="color: #0d000a;">
                <i class="pi pi-info-circle mt-0.5"></i>
                <div>
                  <p class="font-medium">Supported formats:</p>
                  <p>• MTN: 024, 054, 055, 059</p>
                  <p>• Vodafone: 020, 050</p>
                  <p>• AirtelTigo: 027, 057, 026, 056</p>
                </div>
              </div>
              <p v-if="phoneError" class="text-sm text-red-500 font-medium">{{ phoneError }}</p>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-lock mr-2" style="color: #fedd00;"></i>
                Password
              </label>
              <div class="relative">
                <input 
                  v-model="signupForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  class="w-full px-4 py-4 rounded-md border-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 pl-12 pr-12"
                  style="background-color: rgba(243, 242, 242, 0.8); border-color: rgba(13, 0, 10, 0.1); color: #0d000a; font-size: 16px;"
                  :class="{ 'border-red-400': passwordError }"
                  @focus="handleInputFocus"
                  @blur="handleInputBlur"
                  required
                />
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <i class="pi pi-lock text-lg opacity-50" style="color: #0d000a;"></i>
                </div>
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                >
                  <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" 
                     class="text-lg opacity-50 hover:opacity-80" 
                     style="color: #0d000a;"></i>
                </button>
              </div>
              
              <!-- Password Strength Indicator -->
              <div class="space-y-2">
                <div class="flex space-x-1">
                  <div v-for="(level, index) in passwordStrengthLevels" :key="index"
                       class="h-2 flex-1 rounded-full transition-all duration-200"
                       :style="{ backgroundColor: level.active ? level.color : 'rgba(13, 0, 10, 0.1)' }">
                  </div>
                </div>
                <p class="text-xs font-medium" :style="{ color: passwordStrengthColor }">
                  {{ passwordStrengthText }}
                </p>
              </div>
              
              <p v-if="passwordError" class="text-sm text-red-500 font-medium">{{ passwordError }}</p>
            </div>

            <!-- Terms and Privacy -->
            <div class="space-y-4">
              <label class="flex items-start cursor-pointer group">
                <input 
                  v-model="signupForm.acceptTerms"
                  type="checkbox" 
                  class="sr-only"
                  required
                />
                <div class="relative mt-1">
                  <div class="w-5 h-5 rounded border-1 transition-all duration-200 group-hover:border-opacity-60"
                       :style="{
                         backgroundColor: signupForm.acceptTerms ? '#fedd00' : 'transparent',
                         borderColor: signupForm.acceptTerms ? '#fedd00' : 'rgba(13, 0, 10, 0.3)'
                       }">
                    <i v-if="signupForm.acceptTerms" 
                       class="pi pi-check absolute inset-0 flex items-center justify-center text-xs" 
                       style="color: #0d000a; font-weight: bold;"></i>
                  </div>
                </div>
                <div class="ml-3 text-sm leading-relaxed" style="color: #0d000a;">
                  <span class="font-medium">I agree to the </span>
                  <button type="button" @click="openTermsOfService" class="font-semibold hover:underline" style="color: #fedd00;">Terms of Service</button>
                  <span class="font-medium"> and </span>
                  <button type="button" @click="openPrivacyPolicy" class="font-semibold hover:underline" style="color: #fedd00;">Privacy Policy</button>
                </div>
              </label>
            </div>

            <!-- Signup Button -->
            <div class="pt-2">
              <button 
                type="submit"
                :disabled="!canSignup || isLoading"
                class="w-full py-4 rounded-md font-bold text-lg tracking-wide transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                :style="{
                  backgroundColor: canSignup && !isLoading ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                  color: '#0d000a',
                  boxShadow: canSignup && !isLoading ? '0 10px 25px rgba(254, 221, 0, 0.3)' : 'none'
                }"
              >
                <div v-if="isLoading" class="flex items-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-2 border-opacity-30 mr-3" 
                       style="border-color: #0d000a; border-top-color: transparent;"></div>
                  <span>Creating Account...</span>
                </div>
                <div v-else class="flex items-center">
                  <i class="pi pi-user-plus mr-3 text-lg"></i>
                  <span>Create Account</span>
                </div>
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="signupError" class="mt-4 p-4 rounded-md border border-red-200" 
                 style="background-color: rgba(239, 68, 68, 0.1);">
              <div class="flex items-center">
                <i class="pi pi-exclamation-triangle text-red-600 mr-3"></i>
                <span class="text-sm font-medium text-red-600">{{ signupError }}</span>
              </div>
            </div>

            <!-- Social Signup Options -->
            <div class="relative mt-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-opacity-20" style="border-color: #0d000a;"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 text-sm opacity-60 font-medium" style="background-color: rgba(243, 242, 242, 0.95); color: #0d000a;">
                  Or sign up with
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 mt-6">
              <button 
                type="button"
                @click="handleGoogleSignup"
                class="flex items-center justify-center px-4 py-3 rounded-md
                 border-1 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md"
                style="background-color: rgba(243, 242, 242, 0.8); border-color: rgba(13, 0, 10, 0.1); color: #0d000a;"
              >
                <i class="pi pi-google mr-2 text-lg" style="color: #4285f4;"></i>
                <span class="text-sm">Google</span>
              </button>
            
            </div>
          </form>
        </div>
      </div>

      <!-- Login Link -->
      <div class="text-center mt-8">
        <p class="text-sm font-medium" style="color: rgba(243, 242, 242, 0.8);">
          Already have an account? 
          <button 
            @click="handleLogin"
            class="font-bold hover:underline transition-all duration-200 hover:scale-105 ml-1"
            style="color: #fedd00;"
          >
            Sign in here
          </button>
        </p>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6 space-y-2">
        <div class="flex items-center justify-center space-x-6">
          <button class="text-xs opacity-60 hover:opacity-90 transition-opacity duration-200" 
                  style="color: rgba(243, 242, 242, 0.8);"
                  @click="openPrivacyPolicy">
            Privacy Policy
          </button>
          <span class="text-xs opacity-40" style="color: rgba(243, 242, 242, 0.8);">•</span>
          <button class="text-xs opacity-60 hover:opacity-90 transition-opacity duration-200" 
                  style="color: rgba(243, 242, 242, 0.8);"
                  @click="openTermsOfService">
            Terms of Service
          </button>
        </div>
        <p class="text-xs opacity-50" style="color: rgba(243, 242, 242, 0.8);">
          © 2025 DataBundle. All rights reserved.
        </p>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.7);">
      <div class="rounded-2xl shadow-2xl max-w-sm w-full backdrop-blur-sm border border-opacity-20" 
           style="background-color: rgba(243, 242, 242, 0.95); border-color: rgba(254, 221, 0, 0.3);">
        <div class="p-8 text-center">
          <div class="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" 
               style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);">
            <i class="pi pi-check text-3xl text-green-600"></i>
          </div>
          <h3 class="text-xl font-bold tracking-tight mb-3" style="color: #0d000a; font-weight: 700;">Account Created!</h3>
          <p class="text-sm opacity-70 mb-6 font-medium" style="color: #0d000a;">
            Welcome to DataBundle! Your account has been successfully created.
          </p>
          <button @click="closeSuccessModal" 
                  class="w-full py-3 rounded-xl font-bold tracking-wide hover:scale-105 transition-all duration-200"
                  style="background-color: #fedd00; color: #0d000a; box-shadow: 0 10px 25px rgba(254, 221, 0, 0.3);">
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from "vue-router"
import apiClient from "../api/axios"


const router = useRouter()

// Reactive data
const signupForm = ref({
  email: '',
  phone: '',
  password: '',
  acceptTerms: false,
  subscribeNewsletter: false
})

const showPassword = ref(false)
const isLoading = ref(false)
const signupError = ref('')
const showSuccessModal = ref(false)

// Ghana mobile network prefixes
const ghanaPrefixes = [
  '024', '054', '055', '059', '053',// MTN
  '020', '050', // Vodafone
  '027', '057', '026', '056'  // AirtelTigo
]

// Computed properties
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(signupForm.value.email)
})

const isValidPhone = computed(() => {
  // Remove all non-digits
  const cleanPhone = signupForm.value.phone.replace(/\D/g, '')
  
  // Check if it's 10 digits and starts with valid Ghana prefix
  if (cleanPhone.length === 10) {
    const prefix = cleanPhone.substring(0, 3)
    return ghanaPrefixes.includes(prefix)
  }
  
  return false
})

const emailError = computed(() => {
  if (signupForm.value.email && !isValidEmail.value) {
    return 'Please enter a valid email address'
  }
  return ''
})

const phoneError = computed(() => {
  if (signupForm.value.phone) {
    const cleanPhone = signupForm.value.phone.replace(/\D/g, '')
    
    if (cleanPhone.length === 0) return ''
    
    if (cleanPhone.length < 10) {
      return 'Phone number must be 10 digits'
    }
    
    if (cleanPhone.length > 10) {
      return 'Phone number cannot exceed 10 digits'
    }
    
    const prefix = cleanPhone.substring(0, 3)
    if (!ghanaPrefixes.includes(prefix)) {
      return 'Please enter a valid Ghana mobile number'
    }
  }
  return ''
})

const passwordError = computed(() => {
  if (signupForm.value.password && signupForm.value.password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return ''
})

const passwordStrength = computed(() => {
  const password = signupForm.value.password
  let score = 0
  
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  return score
})

const passwordStrengthLevels = computed(() => {
  const strength = passwordStrength.value
  return [
    { active: strength >= 1, color: '#ef4444' },
    { active: strength >= 2, color: '#f97316' },
    { active: strength >= 3, color: '#eab308' },
    { active: strength >= 4, color: '#22c55e' },
    { active: strength >= 5, color: '#16a34a' }
  ]
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  return signupForm.value.password ? texts[strength - 1] || 'Very Weak' : 'Enter password'
})

const passwordStrengthColor = computed(() => {
  const strength = passwordStrength.value
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a']
  return signupForm.value.password ? colors[strength - 1] || '#ef4444' : 'rgba(13, 0, 10, 0.5)'
})

const canSignup = computed(() => {
  return signupForm.value.email && 
         signupForm.value.phone &&
         signupForm.value.password && 
         isValidEmail.value && 
         isValidPhone.value &&
         passwordStrength.value >= 3 &&
         signupForm.value.acceptTerms &&
         !isLoading.value
})

// Methods
const formatPhoneNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '') // Remove non-digits
  
  // Limit to 10 digits
  if (value.length > 10) {
    value = value.substring(0, 10)
  }
  
  // Format as XX XXX XXXX
  let formattedValue = ''
  if (value.length >= 6) {
    formattedValue = value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5)
  } else if (value.length >= 3) {
    formattedValue = value.substring(0, 2) + ' ' + value.substring(2)
  } else {
    formattedValue = value
  }
  
  // Set the display value with formatting
  event.target.value = formattedValue
  
  // Set form value without spaces (stripped)
  signupForm.value.phone = value // This is the clean digits-only version
}



const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleInputFocus = (event) => {
  event.target.style.borderColor = '#fedd00'
  event.target.style.boxShadow = '0 0 0 3px rgba(254, 221, 0, 0.2)'
}

const handleInputBlur = (event) => {
  event.target.style.borderColor = 'rgba(13, 0, 10, 0.1)'
  event.target.style.boxShadow = 'none'
}

const handleSignup = async () => {
  if (!canSignup.value) return
  
  isLoading.value = true
  signupError.value = ''
  
  try {
        
       const data = {
        "email": signupForm.value.email,
        "phone": signupForm.value.phone,
        "password": signupForm.value.password,
        "user_type": "regular"
       }

       const response = await apiClient.post("/users/auth/signup/email", data)
    
    // console.log('Signup data:', {
    //   email: signupForm.value.email,
    //   phone: fullPhoneNumber,
    //   password: signupForm.value.password,
    //   newsletter: signupForm.value.subscribeNewsletter
    // })
    
    if(response.status == 200){
      showSuccessModal.value = true;
      window.location.replace('/')
    }
 
    
  } catch (error) {
    if(error.response){
         switch(error.response.status){
          case 409:
            signupError.value = "An account with this email already exists."
            break
         }
    }else if(error.request){
      signupError.value = "Failed to connect to server. Please try again later."
    }else{
      signupError.value = error.message || 'Account creation failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleGoogleSignup = () => {
  alert('Google signup would be implemented here')
}

const handleFacebookSignup = () => {
  alert('Facebook signup would be implemented here')
}

const handleLogin = () => {
   router.push('/auth/login')
}

const openPrivacyPolicy = () => {
  alert('Privacy Policy would open here')
}

const openTermsOfService = () => {
  alert('Terms of Service would open here')
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  // Redirect to dashboard or login
  alert('Redirecting to login or dashboard...')
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main container animation */
.relative {
  animation: fadeInUp 0.6s ease-out;
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-2px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Input field enhancements */
input {
  font-size: 16px; /* Prevents zoom on iOS */
}

input::placeholder {
  opacity: 0.6;
}

/* Focus ring for accessibility */
button:focus,
input:focus {
  outline: 2px solid #fedd00;
  outline-offset: 2px;
}

/* Custom checkbox styles */
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

/* Modal animations */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fixed {
  animation: modalFadeIn 0.3s ease-out;
}

/* Phone number input special styling */
input[type="tel"] {
  letter-spacing: 0.5px;
  font-family: 'Courier New', monospace;
  font-weight: 500;
}

/* Password strength indicator animations */
.h-2 {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .backdrop-blur-sm {
    margin: 1rem;
  }
  
  button {
    min-height: 44px; /* Touch target size */
  }
  
  input {
    min-height: 48px;
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  .px-8 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
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

/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Enhanced button states */
button:disabled {
  cursor: not-allowed;
  transform: none !important;
}

button:disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Social button hover effects */
button[type="button"]:hover {
  background-color: rgba(243, 242, 242, 0.9) !important;
  border-color: rgba(254, 221, 0, 0.3) !important;
}

/* Ghana flag styling */
.ghana-flag {
  position: relative;
  overflow: hidden;
}

.ghana-flag::after {
  content: '★';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  font-size: 4px;
  line-height: 1;
}

/* Password strength indicator pulse effect */
@keyframes strengthPulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

.h-2[style*="background-color: #22c55e"],
.h-2[style*="background-color: #16a34a"] {
  animation: strengthPulse 2s ease-in-out infinite;
}

/* Phone number formatting helper */
.phone-helper {
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

/* Enhanced form validation states */
.border-red-400 {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Success state for inputs */
input:valid:not(:placeholder-shown) {
  background-image: linear-gradient(45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%), 
                    linear-gradient(-45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, rgba(34, 197, 94, 0.05) 75%), 
                    linear-gradient(-45deg, transparent 75%, rgba(34, 197, 94, 0.05) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

/* Checkbox animation */
@keyframes checkboxPop {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

input[type="checkbox"]:checked + div {
  animation: checkboxPop 0.3s ease-out;
}

/* Loading button pulse */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes buttonLoading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

button[disabled] span {
  animation: buttonLoading 1.5s ease-in-out infinite;
}

/* Enhanced mobile touch targets */
@media (max-width: 640px) {
  button, input, label {
    min-height: 44px;
    touch-action: manipulation;
  }
  
  /* Increase tap targets for checkboxes */
  label.cursor-pointer {
    padding: 8px 0;
    margin: -8px 0;
  }
  
  /* Better spacing for mobile */
  .space-y-6 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 2rem;
  }
  
  .space-y-4 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1.5rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .border-opacity-20,
  .border-opacity-10 {
    border-opacity: 1;
  }
  
  .opacity-50,
  .opacity-60,
  .opacity-70 {
    opacity: 1;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus visible for better keyboard navigation */
button:focus-visible,
input:focus-visible {
  outline: 2px solid #fedd00;
  outline-offset: 2px;
  border-color: #fedd00 !important;
  box-shadow: 0 0 0 3px rgba(254, 221, 0, 0.2) !important;
}

/* Enhanced hover states */
@media (hover: hover) {
  button:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.02);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  input:hover:not(:disabled) {
    border-color: rgba(254, 221, 0, 0.3) !important;
  }
}

/* Print styles */
@media print {
  .backdrop-blur-sm {
    background-color: white !important;
    backdrop-filter: none;
  }
  
  button {
    background-color: #fedd00 !important;
    color: #0d000a !important;
  }
}
</style>