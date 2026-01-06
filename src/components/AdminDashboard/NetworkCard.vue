<template>
  <div class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
    <div class="p-4 border-b bg-gray-50">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold flex items-center">
          <div 
            class="w-6 h-6 rounded-full mr-2" 
            :style="{ backgroundColor: network.color }"
          ></div>
          {{ network.name }}
        </h3>
        <button 
          @click="handleNetworkEdit" 
          class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="p-4 space-y-4">
      <!-- Regular Packages -->
      <div>
        <h4 class="font-medium text-gray-700 mb-2 text-sm">Regular Packages</h4>
        <div class="space-y-2">
          <div 
            v-for="plan in network.regular_packages" 
            :key="plan.id"
            class="flex justify-between items-center p-3 bg-gray-50 rounded-lg group"
          >
            <div class="flex-1">
              <span class="text-sm">{{ plan.value }} - {{ plan.duration }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-900">GH₵{{ plan.base_price }}</span>
              <button 
                @click="handlePackageEdit(plan)"
                class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 p-1 rounded transition-all"
                title="Edit package"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
          <p v-if="!network.regular_packages?.length" class="text-sm text-gray-400 italic p-2">
            No regular packages
          </p>
        </div>
      </div>

      <!-- Agent Packages -->
      <div>
        <h4 class="font-medium text-gray-700 mb-2 text-sm">Agent Packages</h4>
        <div class="space-y-2">
          <div 
            v-for="plan in network.agent_packages" 
            :key="plan.id"
            class="flex justify-between items-center p-3 bg-blue-50 rounded-lg group"
          >
            <div class="flex-1">
              <span class="text-sm">{{ plan.value }} - {{ plan.duration }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-blue-900">GH₵{{ plan.base_price }}</span>
              <button 
                @click="handlePackageEdit(plan)"
                class="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-600 p-1 rounded transition-all"
                title="Edit package"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
          <p v-if="!network.agent_packages?.length" class="text-sm text-gray-400 italic p-2">
            No agent packages
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  network: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'edit-package'])

const handlePackageEdit = (plan) => {
  console.log('Edit button clicked for package:', plan)
  emit('edit-package', plan)
}

const handleNetworkEdit = () => {
  console.log('Network edit clicked:', props.network)
  emit('edit', props.network)
}
</script>