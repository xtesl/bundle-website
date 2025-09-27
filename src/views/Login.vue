<template>
  <div class="min-h-screen flex items-center justify-center" 
  style="background: linear-gradient(135deg, #0d000a 0%, #2d1b23 50%, #0d000a 100%);">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #fedd00 2px, transparent 2px), radial-gradient(circle at 75% 75%, #fedd00 2px, transparent 2px); background-size: 60px 60px;"></div>
    </div>

    <!-- Login Container -->
    <div class="relative w-full pt-4 max-w-md mx-1 sm:mx-auto">
      <!-- Login Card -->
      <div class="backdrop-blur-sm border border-opacity-20 rounded-md overflow-hidden" 
           style="background-color: rgba(243, 242, 242, 0.95); border-color: rgba(254, 221, 0, 0.3); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
        
        <!-- Header Section -->
        <div class="px-8 pt-8 pb-6 text-center">
          <!-- Logo/Brand -->
          <div class="w-20 h-20 mx-auto mb-6 rounded-md flex items-center justify-center" 
               style="background: linear-gradient(135deg, #fedd00 0%, #f4d03f 100%); box-shadow: 0 10px 25px rgba(254, 221, 0, 0.3);">
            <i class="pi pi-user text-3xl" style="color: #0d000a; font-weight: bold;"></i>
          </div>
          
          <h1 class="text-3xl font-bold tracking-tight mb-2" style="color: #0d000a; font-weight: 700;">Welcome Back</h1>
          <p class="text-sm opacity-70 font-medium" style="color: #0d000a;">Sign in to your account to continue</p>
        </div>

        <!-- Form Section -->
        <div class="px-8 pb-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            
            <!-- Email/Username Field -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-envelope mr-2" style="color: #fedd00;"></i>
                Email Address
              </label>
              <div class="relative">
                <input 
                  v-model="loginForm.email"
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
                <div v-if="isValidEmail && loginForm.email" class="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <i class="pi pi-check-circle text-green-500 text-lg"></i>
                </div>
              </div>
              <p v-if="emailError" class="text-sm text-red-500 font-medium">{{ emailError }}</p>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold tracking-wide" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-lock mr-2" style="color: #fedd00;"></i>
                Password
              </label>
              <div class="relative">
                <input 
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
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
              <p v-if="passwordError" class="text-sm text-red-500 font-medium">{{ passwordError }}</p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer group">
                <input 
                  v-model="loginForm.rememberMe"
                  type="checkbox" 
                  class="sr-only"
                />
                <div class="relative">
                  <div class="w-5 h-5 rounded border-2 transition-all duration-200 group-hover:border-opacity-60"
                       :style="{
                         backgroundColor: loginForm.rememberMe ? '#fedd00' : 'transparent',
                         borderColor: loginForm.rememberMe ? '#fedd00' : 'rgba(13, 0, 10, 0.3)'
                       }">
                    <i v-if="loginForm.rememberMe" 
                       class="pi pi-check absolute inset-0 flex items-center justify-center text-xs" 
                       style="color: #0d000a; font-weight: bold;"></i>
                  </div>
                </div>
                <span class="ml-3 text-sm font-medium" style="color: #0d000a;">Remember me</span>
              </label>
              
              <button 
                type="button"
                @click="handleForgotPassword"
                class="text-sm font-semibold hover:underline transition-all duration-200 hover:scale-105"
                style="color: #fedd00;"
              >
                Forgot password?
              </button>
            </div>

            <!-- Login Button -->
            <div class="pt-2">
              <button 
                type="submit"
                :disabled="!canLogin || isLoading"
                class="w-full py-4 rounded-md font-bold text-lg tracking-wide transition-all duration-200 flex items-center 
                justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                :style="{
                  backgroundColor: canLogin && !isLoading ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                  color: '#0d000a',
                  boxShadow: canLogin && !isLoading ? '0 10px 25px rgba(254, 221, 0, 0.3)' : 'none'
                }"
              >
                <div v-if="isLoading" class="flex items-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-2 border-opacity-30 mr-3" 
                       style="border-color: #0d000a; border-top-color: transparent;"></div>
                  <span>Signing in...</span>
                </div>
                <div v-else class="flex items-center">
                  <i class="pi pi-sign-in mr-3 text-lg"></i>
                  <span>Sign In</span>
                </div>
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="loginError" class="mt-4 p-4 rounded-md border border-red-200" 
                 style="background-color: rgba(239, 68, 68, 0.1);">
              <div class="flex items-center">
                <i class="pi pi-exclamation-triangle text-red-600 mr-3"></i>
                <span class="text-sm font-medium text-red-600">{{ loginError }}</span>
              </div>
            </div>

            <!-- Social Login Options -->
            <div class="relative mt-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-opacity-20" style="border-color: #0d000a;"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 text-sm opacity-60 font-medium" style="background-color: rgba(243, 242, 242, 0.95); color: #0d000a;">
                  Or continue with
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 mt-6">
              <button 
                type="button"
                @click="handleGoogleLogin"
                class="flex items-center justify-center px-4 py-3 rounded-md border-1 font-semibold 
                transition-all duration-200 hover:scale-105 hover:shadow-md"
                style="background-color: rgba(243, 242, 242, 0.8); border-color: rgba(13, 0, 10, 0.1); color: #0d000a;"
              >
                <i class="pi pi-google mr-2 text-lg" style="color: #4285f4;"></i>
                <span class="text-sm">Google</span>
              </button>
              
            </div>
          </form>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center mt-8">
        <p class="text-sm font-medium" style="color: rgba(243, 242, 242, 0.8);">
          Don't have an account? 
          <button 
            @click="handleSignUp"
            class="font-bold hover:underline transition-all duration-200 hover:scale-105 ml-1"
            style="color: #fedd00;"
          >
            Sign up now
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
          <h3 class="text-xl font-bold tracking-tight mb-3" style="color: #0d000a; font-weight: 700;">Welcome Back!</h3>
          <p class="text-sm opacity-70 mb-6 font-medium" style="color: #0d000a;">
            You have successfully signed in to your account.
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
import apiClient from '../api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')
const showSuccessModal = ref(false)

// Computed properties
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(loginForm.value.email)
})

const emailError = computed(() => {
  if (loginForm.value.email && !isValidEmail.value) {
    return 'Please enter a valid email address'
  }
  return ''
})

const passwordError = computed(() => {
  if (loginForm.value.password && loginForm.value.password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return ''
})

const canLogin = computed(() => {
  return loginForm.value.email && 
         loginForm.value.password && 
         isValidEmail.value && 
         !passwordError.value && 
         !isLoading.value
})

// Methods
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

const handleLogin = async () => {
  if (!canLogin.value) return
  
  isLoading.value = true
  loginError.value = ''
  
  try {
      const data = {
        "email": loginForm.value.email,
        "password": loginForm.value.password
      }
    
    const response = await apiClient.post("/users/auth/login/email", 
      data
    )
    
    // Simulate login success/failure
    if (response.status == 200) {
      showSuccessModal.value = true
      window.location.replace('/')

    } 
  } catch (error) {
    if(error.response){
          switch(error.response.status){
            case 401:
               loginError.value = "Invalid credentials"
              break;
          }
    }else if(error.request){
      loginError.value = 'Failed to connect to the server. Please try again later.'
    }else{
    loginError.value = error.message || 'Login failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  alert('Forgot password functionality would open here')
}

const handleGoogleLogin = () => {
  alert('Google login would be implemented here')
}

const handleFacebookLogin = () => {
  alert('Facebook login would be implemented here')
}

const handleSignUp = () => {
  router.push("/auth/register")
}

const openPrivacyPolicy = () => {
  alert('Privacy Policy would open here')
}

const openTermsOfService = () => {
  alert('Terms of Service would open here')
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  // Redirect to dashboard or emit event
  alert('Redirecting to dashboard...')
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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
</style>