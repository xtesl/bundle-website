import axios from "axios";
import router from "../router";

const localAddress = "http://localhost:8000/api";
const publicAddress = "https://api.kingdomdatagh.com/api";

const apiClient = axios.create({
  baseURL: publicAddress, // Use publicAddress if deploying
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with each request
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  async (error) => {
    // Check if this is an authentication error by looking at the WWW-Authenticate header
    if (error.response?.status === 401) {
      const wwwAuthenticate = error.response.headers['www-authenticate'];
      
      // Only redirect to login if it's a real auth error (has WWW-Authenticate header)
      const isAuthError = wwwAuthenticate && wwwAuthenticate.toLowerCase().includes('bearer');
      
      if (isAuthError) {
        const currentPath = router.currentRoute.value.fullPath;
        
        // Only redirect if not already on login page
        if (router.currentRoute.value.name !== 'login') {
          router.push({
            name: 'login',
            query: { redirect: currentPath }
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

// Optional: Request interceptor for debugging or adding headers
apiClient.interceptors.request.use(
  (config) => {
    // You can add custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;