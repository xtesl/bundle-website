
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="relative max-w-lg w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
          
          <!-- Header -->
          <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Order Confirmation</h2>
              <p class="text-sm text-gray-500 mt-1">Order #{{ orderData.external_id }}</p>
            </div>
            <button 
              @click="close" 
              class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
              aria-label="Close modal">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <!-- Content -->
          <div class="px-6 py-6">
            
            <!-- Status Section -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-700">Status</p>
                  <p class="text-lg font-semibold text-gray-900 mt-1">{{ getStatusText(orderData.status) }}</p>
                </div>
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i class="pi pi-check-circle text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>

            <!-- Order Details -->
            <div class="space-y-4 mb-6">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Order Details</h3>
              
              <div class="space-y-3">
                <!-- Order ID -->
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Order ID</span>
                  <span class="text-sm font-medium text-gray-900 font-mono">{{ orderData.external_id }}</span>
                </div>

                <!-- Beneficiary -->
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Beneficiary Number</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatPhone(orderData.beneficiary_number) }}</span>
                </div>

                <!-- Amount -->
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Amount Paid</span>
                  <span class="text-sm font-semibold text-gray-900">GH₵{{ orderData.price_paid }}</span>
                </div>

                <!-- Date -->
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Date & Time</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatDateTime(orderData.created_at) }}</span>
                </div>

                <!-- Reference -->
                <div class="flex justify-between items-center py-3">
                  <span class="text-sm text-gray-600">Reference</span>
                  <span class="text-sm font-medium text-gray-900 font-mono">{{ orderData.id.substring(0, 8).toUpperCase() }}</span>
                </div>
              </div>
            </div>

            <!-- Information Notice -->
            <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div class="flex gap-3">
                <i class="pi pi-info-circle text-blue-600 text-sm mt-0.5 flex-shrink-0"></i>
                <p class="text-sm text-gray-700 leading-relaxed">
                  Your order is being processed and will be delivered within 5-15 minutes. You can track the status of your order on the Orders page.
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button 
                @click="handleViewOrders" 
                class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                View Orders
              </button>
              <button 
                @click="close" 
                class="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  orderData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'viewOrders'])

const close = () => {
  emit('update:modelValue', false)
}

const handleViewOrders = () => {
  emit('viewOrders')
  close()
}

const formatPhone = (phone) => {
  if (phone.startsWith('0')) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  }
  return phone
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Processing',
    delivered: 'Delivered',
    failed: 'Failed'
  }
  return statusMap[status] || status
}
</script>
