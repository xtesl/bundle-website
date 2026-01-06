// import { createApp } from 'vue';
// import 'primeicons/primeicons.css';
// import './style.css';
// import App from './App.vue';
// import router from './router';
// import { createPinia } from 'pinia'
// import { useAuthStore } from './stores/authStore'

// const pinia = createPinia()
// const app = createApp(App);

// app.use(router);
// app.use(pinia)

// const authStore = useAuthStore();

// authStore.fetchUserType().finally(() => {
//   app.mount('#app')
// })


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

// Function to hide loading screen
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('app-loading');
  if (loadingScreen) {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.remove();
    }, 300); // Match the CSS transition duration
  }
};

// Fetch user type and mount app
authStore.fetchUserType().finally(() => {
  app.mount('#app')
  
  // Hide loading screen after mount
  // Add a small delay to ensure smooth transition
  setTimeout(() => {
    hideLoadingScreen();
  }, 100);
})