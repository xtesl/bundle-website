import { createApp } from 'vue';
import 'primeicons/primeicons.css';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia)

const authStore = useAuthStore();

authStore.fetchUserType().finally(() => {
  app.mount('#app')
})
