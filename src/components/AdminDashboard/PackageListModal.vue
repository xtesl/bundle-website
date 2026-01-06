<template>
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b p-6 z-10">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full mr-3"
              :style="{ backgroundColor: network.color }"
            ></div>
            <div>
              <h3 class="text-xl font-bold">{{ network.name }} Packages</h3>
              <p class="text-sm text-gray-500">Select a package to edit</p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Package Lists -->
      <div class="p-6 space-y-6">
        <!-- Regular Packages -->
        <div>
          <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
            <span class="text-lg">Regular Packages</span>
            <span class="ml-2 text-sm text-gray-500">
              ({{ network.regular_packages?.length || 0 }})
            </span>
          </h4>
          <div class="space-y-2">
            <button
              v-for="pkg in network.regular_packages"
              :key="pkg.id"
              @click="$emit('edit-package', pkg)"
              class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="text-left">
                  <div class="font-medium text-gray-900">{{ pkg.value }}</div>
                  <div class="text-sm text-gray-500">{{ pkg.duration }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-lg font-semibold text-gray-900">GH₵{{ pkg.base_price }}</span>
                <svg 
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </button>
            <p v-if="!network.regular_packages?.length" class="text-sm text-gray-400 italic p-4 text-center bg-gray-50 rounded-lg">
              No regular packages available
            </p>
          </div>
        </div>

        <!-- Agent Packages -->
        <div>
          <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
            <span class="text-lg">Agent Packages</span>
            <span class="ml-2 text-sm text-gray-500">
              ({{ network.agent_packages?.length || 0 }})
            </span>
          </h4>
          <div class="space-y-2">
            <button
              v-for="pkg in network.agent_packages"
              :key="pkg.id"
              @click="$emit('edit-package', pkg)"
              class="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="text-left">
                  <div class="font-medium text-blue-900">{{ pkg.value }}</div>
                  <div class="text-sm text-blue-600">{{ pkg.duration }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-lg font-semibold text-blue-900">GH₵{{ pkg.base_price }}</span>
                <svg 
                  class="w-5 h-5 text-blue-400 group-hover:text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </button>
            <p v-if="!network.agent_packages?.length" class="text-sm text-gray-400 italic p-4 text-center bg-blue-50 rounded-lg">
              No agent packages available
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-gray-50 border-t p-4">
        <button
          @click="$emit('close')"
          class="w-full px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  network: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'edit-package'])
</script>