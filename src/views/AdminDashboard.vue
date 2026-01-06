<template>
  <AdminLayout :activeTab="activeTab" @update:activeTab="activeTab = $event">
    <BundleRequests v-if="activeTab === 'requests' && userType === 'admin'" />
    <ManagePackages v-if="activeTab === 'packages'" />
    <ManageStoreFront v-if="activeTab === 'storefronts' && userType === 'agent'" />
    <UserManagement v-if="activeTab === 'users' && userType === 'admin'" />
    <PaymentRequets v-if="activeTab === 'payments' && userType === 'admin'" />
     <AgentOrders v-if="activeTab === 'agent-requests' && userType === 'agent'" />
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../components/AdminDashboard/Layout.vue'
import BundleRequests from '../components/AdminDashboard/BundleRequests.vue'
import ManagePackages from '../components/AdminDashboard/ManagePackages.vue'
import ManageStoreFront from '../components/AdminDashboard/ManageStoreFront.vue'
import { useAuthStore } from '../stores/authStore'
import UserManagement from '../components/AdminDashboard/UserManagement.vue'
import PaymentRequets from '../components/AdminDashboard/paymentRequests.vue'
import AgentOrders from '../components/AdminDashboard/AgentOrders.vue'

const authStore = useAuthStore()


const userType = computed(() => authStore.userType)


const activeTab = ref('packages')
</script>