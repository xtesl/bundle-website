<template>
  <div class="space-y-6">
    <!-- Toast Notification -->
    <div 
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 max-w-md animate-slide-in"
    >
      <div 
        class="rounded-lg p-4 flex items-start gap-3"
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

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-lg shadow-md p-12 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
      <p class="text-gray-600 mt-4">Loading your storefront...</p>
    </div>

    <!-- No Storefront - Setup Section -->
    <div v-else-if="!storefront" class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-gray-900">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Setup Your Storefront</h2>
              <p class="text-sm opacity-90">Create your personalized data bundle store</p>
            </div>
          </div>
        </div>

        <div class="p-8">
          <div class="mb-6">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-sm font-bold text-yellow-700">1</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Choose a Store Name</h3>
                <p class="text-sm text-gray-600">This will be used to generate your unique storefront link</p>
              </div>
            </div>
            <div class="flex items-start gap-3 mb-4">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-sm font-bold text-yellow-700">2</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Get Your Unique Link</h3>
                <p class="text-sm text-gray-600">Share your link with customers to start selling</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-sm font-bold text-yellow-700">3</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Start Earning</h3>
                <p class="text-sm text-gray-600">Track orders and earnings from your dashboard</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="createStorefront" class="space-y-4 pt-6 border-t">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Store Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="storeName" 
                @input="debouncedFetchSlug(storeName)"
                type="text"
                placeholder="e.g., QuickData, MyBundleStore"
                required
                :disabled="creating"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100 text-lg"
              >
              <p class="text-xs text-gray-500 mt-2">
                Your store will be available at: 
                <span class="font-mono text-yellow-600 font-medium">
                  {{ baseUrl }}/store/{{ previewSlug || 'your-store-name' }}
                </span>
              </p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex gap-2">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-medium mb-1">Important Note:</p>
                  <p>You can change your store name later, but this will generate a new link. Your old link will no longer work, so updating is not recommended once you've shared your store.</p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              :disabled="creating || !storeName.trim()"
              class="w-full px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            >
              <svg v-if="creating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ creating ? 'Creating Your Store...' : 'Create My Storefront' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Existing Storefront - Management Section -->
    <div v-else class="space-y-6">
      <!-- Storefront Card -->
      <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-md p-6 text-gray-900">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-2xl font-bold mb-1">{{ storefront.name }}</h2>
            <p class="text-sm opacity-90">Your storefront is live and ready to sell!</p>
          </div>
          <span 
            class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
            :class="storefront.is_active ? 'text-green-900' : 'text-red-900'"
          >
            {{ storefront.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p class="text-xs font-medium mb-2 opacity-90">Your Storefront URL</p>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input 
              :value="storefrontUrl" 
              readonly
              class="flex-1 px-3 py-2 bg-white/40 backdrop-blur-sm rounded border-0 text-sm font-mono"
            >
            <div class="flex gap-2">
              <button 
                @click="copyUrl"
                class="flex-1 sm:flex-none px-4 py-2 bg-white text-yellow-600 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
              <a 
                :href="storefrontUrl" 
                target="_blank"
                class="flex-1 sm:flex-none px-4 py-2 bg-white text-yellow-600 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Total Orders</span>
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ storefront.total_orders || 0 }}</p>
          <p class="text-xs text-gray-500 mt-1">All time orders</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Total Revenue</span>
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-3xl font-bold text-gray-900">GH₵{{ (storefront.total_revenue || 0).toLocaleString() }}</p>
          <p class="text-xs text-gray-500 mt-1">Total earnings</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Store Status</span>
            <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <button 
            @click="toggleStatus"
            :disabled="toggling"
            class="mt-2 text-sm font-medium px-4 py-2 rounded-full transition-colors w-full disabled:opacity-50"
            :class="storefront.is_active 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'"
          >
            {{ storefront.is_active ? 'Deactivate Store' : 'Activate Store' }}
          </button>
        </div>
      </div>

      <!-- Actions Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            @click="showEditModal = true"
            class="px-4 py-4 border-2 border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors text-left group"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                <svg class="w-5 h-5 text-gray-600 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Change Store Name</p>
                <p class="text-xs text-gray-500">This will generate a new link</p>
              </div>
            </div>
          </button>

          <button 
            @click="shareStorefront"
            class="px-4 py-4 border-2 border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors text-left group"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                <svg class="w-5 h-5 text-gray-600 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Share via WhatsApp</p>
                <p class="text-xs text-gray-500">Send link to customers</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Payment Requests Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Payment Requests</h3>
            <p class="text-sm text-gray-600">Request withdrawals to your mobile money</p>
          </div>
          <button 
            @click="showPaymentRequestModal = true"
            :disabled="!isFriday"
            class="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Request
          </button>
        </div>

        <!-- Friday Notice -->
        <div v-if="!isFriday" class="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div class="text-sm text-blue-800">
              <p class="font-medium mb-1">Payment Request Schedule</p>
              <p>Payment requests can only be created on <strong>Fridays</strong> and will be processed on <strong>Saturdays</strong>.</p>
            </div>
          </div>
        </div>

        <!-- Requests List -->
        <div v-if="loadingRequests" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p class="text-gray-600 mt-2 text-sm">Loading requests...</p>
        </div>

        <div v-else-if="paymentRequests.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-600 font-medium">No payment requests yet</p>
          <p class="text-sm text-gray-500 mt-1">Create your first request on Friday</p>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="request in paymentRequests" 
            :key="request.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-colors"
          >
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-lg font-bold text-gray-900">GH₵{{ request.amount.toLocaleString() }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ request.mobilemoney_name }}</p>
                <p class="text-sm text-gray-500 font-mono">{{ request.receiver_number }}</p>
              </div>
              <span 
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-yellow-100 text-yellow-700': request.status === 'pending',
                  'bg-green-100 text-green-700': request.status === 'completed',
                  'bg-blue-100 text-blue-700': request.status === 'processing',
                  'bg-red-100 text-red-700': request.status === 'rejected'
                }"
              >
                <!-- {{ request.status.charAt(0).toUpperCase() + request.status.slice(1) }} -->
              </span>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <p class="text-xs text-gray-500">
                Created: {{ new Date(request.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" @click.self="showEditModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">Change Store Name</h3>
          <p class="text-sm text-gray-600 mt-1">This will generate a new storefront link</p>
        </div>
        <form @submit.prevent="updateStorefront" class="p-6 space-y-4">
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div class="flex gap-2">
              <svg class="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-yellow-800">Your old link will stop working. Make sure to update it everywhere you've shared it!</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              New Store Name
            </label>
            <input 
              v-model="editStoreName" 
              @input="debouncedFetchSlug(editStoreName, true)"
              type="text"
              required
              :disabled="updating"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
            <p class="text-xs text-gray-500 mt-2">
              New URL: <span class="font-mono text-yellow-600">{{ baseUrl }}/store/{{ editPreviewSlug || 'new-name' }}</span>
            </p>
          </div>

          <div class="flex gap-3 pt-2">
            <button 
              type="button"
              @click="showEditModal = false"
              :disabled="updating"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="updating || !editStoreName.trim()"
              class="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <svg v-if="updating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ updating ? 'Updating...' : 'Update Store Name' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Payment Request Modal -->
    <div v-if="showPaymentRequestModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" @click.self="showPaymentRequestModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900">Create Payment Request</h3>
          <p class="text-sm text-gray-600 mt-1">Request will be processed on Saturday</p>
        </div>
        <form @submit.prevent="createPaymentRequest" class="p-6 space-y-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-3">
            <div class="flex gap-2">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-green-800">Payment requests created on Friday will be processed and completed on Saturday.</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Amount (GH₵) <span class="text-red-500">*</span>
            </label>
            <input 
              v-model.number="paymentRequestForm.amount" 
              type="number"
              step="0.01"
              min="1"
              placeholder="0.00"
              required
              :disabled="creatingRequest"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mobile Money Name <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="paymentRequestForm.mobilemoney_name" 
              type="text"
              placeholder="Kofi Adomah"
              required
              :disabled="creatingRequest"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
            <p class="text-xs text-gray-500 mt-1">Enter the name on your mobile money account</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mobile Money Number <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="paymentRequestForm.receiver_number" 
              type="tel"
              placeholder="0241234567"
              required
              :disabled="creatingRequest"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
            <p class="text-xs text-gray-500 mt-1">Enter your mobile money number</p>
          </div>

          <div class="flex gap-3 pt-2">
            <button 
              type="button"
              @click="showPaymentRequestModal = false"
              :disabled="creatingRequest"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="creatingRequest || !isFormValid"
              class="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <svg v-if="creatingRequest" class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ creatingRequest ? 'Creating...' : 'Submit Request' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '../../api/axios'

const baseUrl = window.location.origin
const loading = ref(false)
const creating = ref(false)
const updating = ref(false)
const toggling = ref(false)
const storeName = ref('')
const editStoreName = ref('')
const storefront = ref(null)
const showEditModal = ref(false)
const previewSlug = ref('')
const editPreviewSlug = ref('')
const slugTimeout = ref(null)
const slug = ref('')
const showPaymentRequestModal = ref(false)
const creatingRequest = ref(false)
const loadingRequests = ref(false)
const paymentRequests = ref([])
const paymentRequestForm = ref({
  amount: null,
  receiver_number: '',
  mobilemoney_name: ''
})

const toast = ref({
  show: false,
  type: 'success',
  message: ''
})

const storefrontUrl = computed(() => {
  if (!storefront.value) return ''
  return `${baseUrl}/storefront/${storefront.value.slug}`
})

const isFriday = computed(() => {
  const today = new Date()
  return today.getDay() === 5 // 5 = Friday (0 = Sunday, 6 = Saturday)
})

const isFormValid = computed(() => {
  return paymentRequestForm.value.amount > 0 &&
         paymentRequestForm.value.receiver_number.trim() !== '' &&
         paymentRequestForm.value.mobilemoney_name !== ''
})

const fetchSlug = async (name, isEdit = false) => {
  if (!name.trim()) {
    if (isEdit) {
      editPreviewSlug.value = ''
    } else {
      previewSlug.value = ''
    }
    return
  }

  try {
    const response = await apiClient.post(`/management/utils/create-slug?name=${encodeURIComponent(name.trim())}`)
    if (response.status === 200 && response.data) {
      slug.value = response.data
      if (isEdit) {
        editPreviewSlug.value = response.data
      } else {
        previewSlug.value = response.data
      }
    }
  } catch (error) {
    console.error('Error generating slug:', error)
  }
}

const debouncedFetchSlug = (name, isEdit = false) => {
  clearTimeout(slugTimeout.value)
  slugTimeout.value = setTimeout(() => {
    fetchSlug(name, isEdit)
  }, 500)
}

const showToast = (message, type = 'success') => {
  toast.value = { show: true, type, message }
  setTimeout(() => { toast.value.show = false }, 3000)
}

const loadStorefront = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/management/storefronts')
    if (response.status === 200 && response.data) {
      storefront.value = response.data
      await loadPaymentRequests()
    }
  } catch (error) {
    if (error.response?.status !== 404) {
      showToast('Failed to load storefront', 'error')
    }
  } finally {
    loading.value = false
  }
}

const createStorefront = async () => {
  creating.value = true
  try {
    const response = await apiClient.post('/management/storefronts', {
      name: storeName.value.trim(),
      slug: slug.value
    })
    
    if (response.status === 200) {
      storefront.value = response.data
      showToast('Storefront created successfully!')
      storeName.value = ''
    }
  } catch (error) {
    showToast(error.response?.data?.message || 'Failed to create storefront', 'error')
  } finally {
    creating.value = false
  }
}

const updateStorefront = async () => {
  updating.value = true
  try {
    const response = await apiClient.put('/management/storefronts', {
      name: editStoreName.value.trim(),
      slug: slug.value
    })
    
    if (response.status === 200) {
      storefront.value = response.data
      showToast('Store name updated successfully!')
      showEditModal.value = false
    }
  } catch (error) {
    showToast(error.response?.data?.message || 'Failed to update storefront', 'error')
  } finally {
    updating.value = false
  }
}

const toggleStatus = async () => {
  toggling.value = true
  try {
    const response = await apiClient.put(`/management/storefronts`, {'is_active': !storefront.value.is_active})
    
    if (response.status === 200) {
      storefront.value.is_active = !storefront.value.is_active
      showToast(`Store ${storefront.value.is_active ? 'activated' : 'deactivated'} successfully`)
    }
  } catch (error) {
    showToast('Failed to toggle status', 'error')
  } finally {
    toggling.value = false
  }
}

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(storefrontUrl.value)
    showToast('URL copied to clipboard!')
  } catch (error) {
    showToast('Failed to copy URL', 'error')
  }
}

const shareStorefront = () => {
  const text = `Check out my data bundle store! Get affordable data bundles here: ${storefrontUrl.value}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(whatsappUrl, '_blank')
}

const loadPaymentRequests = async () => {
  loadingRequests.value = true
  try {
    const response = await apiClient.get('/payments/payment-requests/me')
    if (response.status === 200 && response.data) {
      paymentRequests.value = response.data
    }
  } catch (error) {
    console.error('Error loading payment requests:', error)
    showToast('Failed to load payment requests', 'error')
  } finally {
    loadingRequests.value = false
  }
}

const createPaymentRequest = async () => {
  creatingRequest.value = true
  try {
    const response = await apiClient.post('/payments/create-payment-request', {
      amount: paymentRequestForm.value.amount,
      receiver_number: paymentRequestForm.value.receiver_number.trim(),
      mobilemoney_name: paymentRequestForm.value.mobilemoney_name
    })
    
    if (response.status === 200 || response.status === 201) {
      showToast('Payment request created successfully!')
      showPaymentRequestModal.value = false
      paymentRequestForm.value = {
        amount: null,
        receiver_number: '',
        mobilemoney_name: ''
      }
      await loadPaymentRequests()
    }
  } catch (error) {
    showPaymentRequestModal.value = false
    showToast('Failed to create payment request', 'error')
  } finally {
    creatingRequest.value = false
  }
}

onMounted(() => {
  loadStorefront()
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