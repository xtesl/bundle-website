<script setup>
import { ref, onMounted } from 'vue'
import apiClient from "../api/axios"

const loading = ref(true)
const walletBalance = ref(0)

// Simulate data fetching - replace with your actual API call
const fetchUserData = async () => {
  loading.value = true
  try {
    
    const response = await apiClient.get("/users/wallet/read")
  
   walletBalance.value = response.data.balance
  } catch (error) {
    console.error('Error fetching user data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div>
    <!-- Skeleton Loader -->
    <div v-if="loading" class="skeleton-loader">
      <div class="skeleton-box"></div>
    </div>

    <!-- Actual Content -->
    <span 
      v-else 
      class="text-lg font-bold" 
      style="color: #0d000a; font-weight: 700;"
    >
      GH₵{{ walletBalance.toLocaleString() }}
    </span>
  </div>
</template>

<style scoped>
.skeleton-loader {
  display: inline-block;
}

.skeleton-box {
  width: 120px;
  height: 28px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>