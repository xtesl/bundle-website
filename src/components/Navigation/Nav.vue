<template>
  <nav class="shadow-lg border-b sticky top-0 z-50" 
       style="background-color: #0d000a; border-bottom: 1px solid #fedd00;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold tracking-tight" style="color: #fedd00;">
              BundleHub
            </h1>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden xl:flex xl:items-center xl:space-x-1">
          <!-- Buy Data Dropdown -->
          <div class="relative" @mouseenter="showDropdown" @mouseleave="hideDropdown">
            <button class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-opacity-10 group" 
                    style="color: #f3f2f2;"
                    :style="dropdownOpen ? 'background-color: rgba(254, 221, 0, 0.1);' : ''"
                    @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                    @mouseout="!dropdownOpen && ($event.target.style.backgroundColor = 'transparent')">
              <i class="pi pi-shopping-cart mr-2 text-base"></i>
              <span class="mr-2">Buy Data</span>
              <i class="pi pi-chevron-down text-xs transition-transform duration-200"
                 :class="{ 'rotate-180': dropdownOpen }"></i>
            </button>
            
            <div v-show="dropdownOpen" 
                 class="absolute z-50 mt-1 w-56 rounded-lg shadow-xl ring-1 ring-opacity-5 focus:outline-none border"
                 style="background-color: #f3f2f2; border-color: rgba(254, 221, 0, 0.3); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
              <div class="py-2" role="menu">
                <a href="#" class="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-opacity-10" 
                   style="color: #0d000a;"
                   @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                   @mouseout="$event.target.style.backgroundColor = 'transparent'"
                   role="menuitem">
                  <i class="pi pi-user mr-3 text-base opacity-70"></i>
                  Individual Customer
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-opacity-10" 
                   style="color: #0d000a;"
                   @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                   @mouseout="$event.target.style.backgroundColor = 'transparent'"
                   role="menuitem">
                  <i class="pi pi-briefcase mr-3 text-base opacity-70"></i>
                  Business Customer
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-opacity-10" 
                   style="color: #0d000a;"
                   @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                   @mouseout="$event.target.style.backgroundColor = 'transparent'"
                   role="menuitem">
                  <i class="pi pi-building mr-3 text-base opacity-70"></i>
                  Corporate Customer
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-opacity-10" 
                   style="color: #0d000a;"
                   @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                   @mouseout="$event.target.style.backgroundColor = 'transparent'"
                   role="menuitem">
                  <i class="pi pi-users mr-3 text-base opacity-70"></i>
                  Reseller Account
                </a>
              </div>
            </div>
          </div>

          <!-- Other Navigation Items -->
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200" 
             style="color: #f3f2f2;"
             @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
             @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-list mr-2 text-base"></i>
            <span>My Orders</span>
          </a>

          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200" 
             style="color: #f3f2f2;"
             @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
             @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-credit-card mr-2 text-base"></i>
            <span>Wallet Topup</span>
          </a>

          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200" 
             style="color: #f3f2f2;"
             @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
             @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-users mr-2 text-base"></i>
            <span>Join Agent Group</span>
          </a>

          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200" 
             style="color: #f3f2f2;"
             @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
             @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-user-edit mr-2 text-base"></i>
            <span>My Account</span>
          </a>

          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200" 
             style="color: #f3f2f2;"
             @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
             @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-question-circle mr-2 text-base"></i>
            <span>How To Buy</span>
          </a>
        </div>

        <!-- Wallet & User Section -->
        <div class="hidden xl:flex xl:items-center xl:space-x-4">
          <!-- Wallet Display -->
          <div class="flex items-center rounded-sm px-4 py-1 border-opacity-20" 
               style="background-color: rgba(243, 242, 242, 0.95); border-color: #fedd00;">
            <i class="pi pi-wallet mr-3 text-base" style="color: #fedd00;"></i>
            <div class="flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-wider opacity-70" style="color: #0d000a;">My Wallet</span>
              <span class="text-sm font-bold" style="color: #0d000a;">${{ walletBalance.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Logout -->
          <button class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 border border-transparent hover:border-opacity-30" 
                  style="color: #f3f2f2; border-color: #fedd00;"
                  @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                  @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-sign-out mr-2 text-base"></i>
            <span>Logout</span>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="xl:hidden flex items-center">
          <button @click="toggleMobileMenu" 
                  class="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
                  style="color: #f3f2f2;"
                  @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                  @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <span class="sr-only">Open main menu</span>
            <i v-if="!mobileMenuOpen" class="pi pi-bars text-xl"></i>
            <i v-else class="pi pi-times text-xl"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileMenuOpen" class="xl:hidden border-t" 
         style="background-color: #0d000a; border-color: rgba(254, 221, 0, 0.2);">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Mobile Buy Data -->
        <div class="space-y-1">
          <button @click="toggleMobileDropdown"
                  class="w-full flex items-center justify-between pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200"
                  style="color: #f3f2f2;"
                  @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
                  @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <div class="flex items-center">
              <i class="pi pi-shopping-cart mr-3 text-base"></i>
              <span>Buy Data</span>
            </div>
            <i class="pi pi-chevron-down text-sm transition-transform duration-200" 
               :class="{ 'rotate-180': mobileDropdownOpen }"></i>
          </button>
          
          <div v-show="mobileDropdownOpen" class="space-y-1" 
               style="background-color: rgba(243, 242, 242, 0.05);">
            <a href="#" class="flex items-center pl-8 pr-4 py-3 text-sm font-medium transition-colors duration-200"
               style="color: #f3f2f2; opacity: 0.8;"
               @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'; $event.target.style.opacity = '1'"
               @mouseout="$event.target.style.backgroundColor = 'transparent'; $event.target.style.opacity = '0.8'">
              <i class="pi pi-user mr-3 text-sm" style="color: #fedd00;"></i>
              Individual Customer
            </a>
            <a href="#" class="flex items-center pl-8 pr-4 py-3 text-sm font-medium transition-colors duration-200"
               style="color: #f3f2f2; opacity: 0.8;"
               @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'; $event.target.style.opacity = '1'"
               @mouseout="$event.target.style.backgroundColor = 'transparent'; $event.target.style.opacity = '0.8'">
              <i class="pi pi-briefcase mr-3 text-sm" style="color: #fedd00;"></i>
              Business Customer
            </a>
            <a href="#" class="flex items-center pl-8 pr-4 py-3 text-sm font-medium transition-colors duration-200"
               style="color: #f3f2f2; opacity: 0.8;"
               @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'; $event.target.style.opacity = '1'"
               @mouseout="$event.target.style.backgroundColor = 'transparent'; $event.target.style.opacity = '0.8'">
              <i class="pi pi-building mr-3 text-sm" style="color: #fedd00;"></i>
              Corporate Customer
            </a>
            <a href="#" class="flex items-center pl-8 pr-4 py-3 text-sm font-medium transition-colors duration-200"
               style="color: #f3f2f2; opacity: 0.8;"
               @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'; $event.target.style.opacity = '1'"
               @mouseout="$event.target.style.backgroundColor = 'transparent'; $event.target.style.opacity = '0.8'">
              <i class="pi pi-users mr-3 text-sm" style="color: #fedd00;"></i>
              Reseller Account
            </a>
          </div>
        </div>

        <!-- Mobile Navigation Links -->
        <a href="#" class="flex items-center pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200" 
           style="color: #f3f2f2;"
           @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
           @mouseout="$event.target.style.backgroundColor = 'transparent'">
          <i class="pi pi-list mr-3 text-base"></i>
          <span>My Orders</span>
        </a>

        <a href="#" class="flex items-center pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200" 
           style="color: #f3f2f2;"
           @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
           @mouseout="$event.target.style.backgroundColor = 'transparent'">
          <i class="pi pi-credit-card mr-3 text-base"></i>
          <span>Wallet Topup</span>
        </a>

        <a href="#" class="flex items-center pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200" 
           style="color: #f3f2f2;"
           @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
           @mouseout="$event.target.style.backgroundColor = 'transparent'">
          <i class="pi pi-users mr-3 text-base"></i>
          <span>Join Agent Group</span>
        </a>

        <a href="#" class="flex items-center pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200" 
           style="color: #f3f2f2;"
           @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
           @mouseout="$event.target.style.backgroundColor = 'transparent'">
          <i class="pi pi-user-edit mr-3 text-base"></i>
          <span>My Account</span>
        </a>

        <a href="#" class="flex items-center pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200" 
           style="color: #f3f2f2;"
           @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
           @mouseout="$event.target.style.backgroundColor = 'transparent'">
          <i class="pi pi-question-circle mr-3 text-base"></i>
          <span>How To Buy</span>
        </a>
      </div>

      <!-- Mobile Wallet & User Section -->
      <div class="pt-4 pb-3 border-t" style="border-color: rgba(254, 221, 0, 0.2);">
        <!-- Mobile Wallet -->
        <div class="flex items-center justify-between px-4 py-3 mx-4 rounded-sm border-opacity-30" 
             style="background-color: rgba(243, 242, 242, 0.95); border-color: #fedd00;">
          <div class="flex items-center">
            <i class="pi pi-wallet mr-3 text-lg" style="color: #fedd00;"></i>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider opacity-70" style="color: #0d000a;">My Wallet</p>
              <p class="text-lg font-bold" style="color: #0d000a;">${{ walletBalance.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Mobile Logout -->
        <div class="mt-3 px-2">
          <a href="#" class="flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200" 
             style="color: #f3f2f2;"
             @mouseover="$event.target.style.backgroundColor = 'rgba(254, 221, 0, 0.1)'"
             @mouseout="$event.target.style.backgroundColor = 'transparent'">
            <i class="pi pi-sign-out mr-3 text-base"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive state
const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)
const mobileDropdownOpen = ref(false)
const walletBalance = ref(25750.50)

// Methods
const showDropdown = () => {
  dropdownOpen.value = true
}

const hideDropdown = () => {
  dropdownOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    mobileDropdownOpen.value = false
  }
}

const toggleMobileDropdown = () => {
  mobileDropdownOpen.value = !mobileDropdownOpen.value
}

const handleResize = () => {
  if (window.innerWidth >= 1280) { // xl breakpoint
    mobileMenuOpen.value = false
    mobileDropdownOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Import PrimeIcons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/primeicons/6.0.1/primeicons.min.css');

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dropdown positioning */
.relative .absolute {
  z-index: 50;
}

/* Icon alignment */
.pi {
  display: inline-block;
  vertical-align: middle;
}

/* Remove any default button styles */
button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Ensure proper spacing */
.xl\:space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}

.xl\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
</style>