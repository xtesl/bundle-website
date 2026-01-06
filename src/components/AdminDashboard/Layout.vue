<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-gray-900 border-b border-yellow-400 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <button 
              @click="toggleSidebar" 
              class="lg:hidden mr-4 text-yellow-400 hover:text-yellow-300 p-2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-xl font-bold text-yellow-400">Admin Control</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center">
                <span class="text-sm font-bold">A</span>
              </div>
              <span class="hidden sm:block text-sm font-medium text-gray-200">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar Overlay for Mobile -->
      <div 
        v-if="sidebarOpen" 
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      ></div>

      <!-- Sidebar -->
      <aside 
        class="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <nav class="mt-5 px-4 pb-4 overflow-y-auto h-[calc(100vh-5rem)]">
          <div class="space-y-2">
            <button 
              v-for="item in sidebarItems" 
              :key="item.id" 
              @click="setActiveTab(item.id)"
              class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all"
              :class="activeTab === item.id ? 'bg-yellow-400 text-gray-900' : 'text-gray-300 hover:bg-gray-800'"
            >
              <i :class="item.icon" class="mr-3"></i>
              {{ item.name }}
              <span v-if="item.badge" class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {{ item.badge }}
              </span>
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4 sm:p-6 lg:ml-0">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
})


const authStore = useAuthStore()
const emit = defineEmits(['update:activeTab'])
const userType = computed(() => authStore.userType)

const sidebarOpen = ref(false)

const sidebarItems = userType.value === 'admin' ? ref([
  { id: 'packages', name: 'Manage Packages', icon: 'pi pi-box' },
  { id: 'requests', name: 'Bundle Requests', icon: 'pi pi-list' },
  {id: 'users', name: 'Manage Users', icon: 'pi pi-users'},
  {id: 'payments', name: "Payment Requests", icon: 'pi pi-money-bill'}

]) :  ref([
    {id: 'packages', name: 'Manage Packages', icon: 'pi pi-box'},
    {id: 'storefronts', name: 'Manage Store', icon: 'pi pi-tags'},
    {id: "agent-requests", name: "Orders", icon: 'pi pi-list'},
])

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const setActiveTab = (tabId) => {
  emit('update:activeTab', tabId)
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}
</script>
