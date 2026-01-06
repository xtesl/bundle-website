<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Nav from './components/Navigation/Nav.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

const route = useRoute()


const hideNavbarRoutes = ['login', 'register', 'register-agent']

onMounted(() => {

})
</script>

<template>
  <Nav v-if="!hideNavbarRoutes.includes($route.name)" />

  <router-view />
 <WhatsAppButton 
      phone-number="23356373440"
      message="Hello!"
      :show-pulse="true"
    />
</template>

<style scoped>

</style>
