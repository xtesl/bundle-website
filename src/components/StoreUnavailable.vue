<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Main Card -->
      <div class="bg-white rounded-2xl overflow-hidden">
        <!-- Icon Section -->
        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-pulse">
            <i class="pi pi-lock text-5xl text-white"></i>
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">Store Temporarily Unavailable</h1>
        </div>

        <!-- Content Section -->
        <div class="p-8 text-center">
          <div class="mb-6">
            <i class="pi pi-info-circle text-4xl text-gray-400 mb-4"></i>
          </div>

          <h2 class="text-xl font-semibold text-gray-900 mb-3">
            This Store is Currently Closed
          </h2>
          
          <p class="text-gray-600 mb-6 leading-relaxed">
            The store owner has temporarily disabled this storefront. 
            Please check back later or contact the store owner directly for assistance.
          </p>

          <!-- Decorative Divider -->
          <div class="flex items-center justify-center mb-6">
            <div class="h-px bg-gray-200 flex-1"></div>
            <i class="pi pi-shopping-bag text-gray-300 mx-4 text-xl"></i>
            <div class="h-px bg-gray-200 flex-1"></div>
          </div>

          <!-- Info Box -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <i class="pi pi-exclamation-circle text-blue-600 text-lg mt-0.5"></i>
              <div class="text-left">
                <p class="text-sm text-blue-900 font-medium mb-1">What does this mean?</p>
                <p class="text-xs text-blue-800">
                  The store owner has chosen to pause operations temporarily. 
                  This could be for maintenance, inventory updates, or other reasons.
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button 
              @click="goHome"
              class="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <i class="pi pi-home"></i>
              Go to Homepage
            </button>

            <button 
              @click="$emit('retry')"
              class="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <i class="pi pi-refresh"></i>
              Try Again
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <p class="text-xs text-gray-500 text-center">
            Need help? Contact support at 
            <a href="mailto:support@example.com" class="text-yellow-600 hover:text-yellow-700 font-medium">
              support@example.com
            </a>
          </p>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="mt-6 grid grid-cols-3 gap-3">
        <div class="bg-white rounded-lg p-4 text-center ">
          <i class="pi pi-clock text-2xl text-gray-400 mb-2"></i>
          <p class="text-xs text-gray-600 font-medium">Temporary</p>
        </div>
        <div class="bg-white rounded-lg p-4 text-center">
          <i class="pi pi-shield text-2xl text-green-500 mb-2"></i>
          <p class="text-xs text-gray-600 font-medium">Safe & Secure</p>
        </div>
        <div class="bg-white rounded-lg p-4 text-center">
          <i class="pi pi-heart text-2xl text-red-500 mb-2"></i>
          <p class="text-xs text-gray-600 font-medium">Coming Back</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Define emits
defineEmits(['retry'])

// Methods
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>