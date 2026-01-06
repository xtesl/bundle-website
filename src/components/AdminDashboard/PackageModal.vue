<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b p-6 z-10">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">
            {{ packageToEdit ? `Edit Package: ${packageToEdit.value}` : 'Add New Package' }}
          </h3>
          <button 
            @click="closeModal" 
            class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            :disabled="saving"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p v-if="packageToEdit" class="text-sm text-gray-500 mt-1">
          Network: {{ getNetworkName(packageToEdit.network_id) }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Network Selection (only for new packages) -->
        <div v-if="!packageToEdit">
          <label class="block text-sm font-medium mb-2">Network</label>
          <select 
            v-model="form.network_id" 
            required 
            :disabled="saving"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Network</option>
            <option v-for="net in networks" :key="net.id" :value="net.id">
              {{ net.name }}
            </option>
          </select>
        </div>

        <!-- Package Type -->
        <div>
          <label class="block text-sm font-medium mb-2">Package Type</label>
          <div class="flex gap-4">
            <label class="flex items-center cursor-pointer">
              <input 
                type="radio" 
                v-model="form.is_agent_package" 
                :value="false"
                :disabled="saving"
                class="mr-2"
              >
              <span class="text-sm">Regular Package</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input 
                type="radio" 
                v-model="form.is_agent_package" 
                :value="true"
                :disabled="saving"
                class="mr-2"
              >
              <span class="text-sm">Agent Package</span>
            </label>
          </div>
        </div>

        <!-- Package Details -->
        <div 
          class="p-4 rounded-lg space-y-4"
          :class="form.is_agent_package ? 'bg-blue-50' : 'bg-gray-50'"
        >
          <div>
            <label class="block text-sm font-medium mb-2">Data Value</label>
            <input 
              v-model="form.value" 
              placeholder="e.g., 1GB, 500MB" 
              required 
              :disabled="saving"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Duration</label>
            <input 
              v-model="form.duration" 
              placeholder="e.g., 30 days, 7 days" 
              required 
              :disabled="saving"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Base Price (GH₵)</label>
            <input 
              v-model="form.base_price" 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              required 
              :disabled="saving"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
            >
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
          <button 
            type="button" 
            @click="closeModal" 
            :disabled="saving"
            class="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="saving"
            class="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ saving ? 'Saving...' : (packageToEdit ? 'Update Package' : 'Create Package') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import apiClient from '../../api/axios'

const props = defineProps({
  packageToEdit: {
    type: Object,
    default: null
  },
  networks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'saved', 'error'])

const saving = ref(false)

const form = ref({
  network_id: '',
  value: '',
  duration: '',
  base_price: '',
  is_agent_package: false
})

const getNetworkName = (networkId) => {
  const network = props.networks.find(n => n.id === networkId)
  return network?.name || 'Unknown'
}

// Populate form when editing
watch(() => props.packageToEdit, (pkg) => {
  if (pkg) {
    form.value = {
      network_id: pkg.network_id,
      value: pkg.value,
      duration: pkg.duration,
      base_price: pkg.base_price,
      is_agent_package: pkg.audience === 'agent'
    }
  } else {
    // Reset form for new package
    form.value = {
      network_id: '',
      value: '',
      duration: '',
      base_price: '',
      is_agent_package: false
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  saving.value = true

  try {
    // Validation
    if (!form.value.network_id) {
      throw new Error('Please select a network')
    }
    if (parseFloat(form.value.base_price) <= 0) {
      throw new Error('Price must be greater than 0')
    }

    const data = {
      network_id: form.value.network_id, 
      value: form.value.value,
      duration: form.value.duration,
      base_price: form.value.base_price,
      audience: form.value.is_agent_package ? 'agent' : 'regular'
    }

    if (props.packageToEdit) {
      // Update existing package
      await apiClient.patch(`/management/plans/${props.packageToEdit.id}`, data)
      emit('saved', 'Package updated successfully!')
    } else {
      // Create new package
      await apiClient.post('/management/create-package', data)
      emit('saved', 'Package created successfully!')
    }

    closeModal()

  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'Failed to save package'
    emit('error', errorMessage, 'error')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  if (!saving.value) {
    emit('close')
  }
}
</script>