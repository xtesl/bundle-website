import axios from "axios";
import router from "../router";

const localAddress = "http://localhost:8000/api";
const publicAddress = "https://fastapi-backend-rfsj.onrender.com/api";

const apiClient = axios.create({
  baseURL: publicAddress, // Use publicAddress if deploying
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with each request
});

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject immediately
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Check if error is due to invalid/expired token
    const isTokenError = 
      error.response?.data?.detail === "Invalid token" ||
      error.response?.data?.detail === "Authorization token is missing.";

    if (isTokenError) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await apiClient.post("/users/auth/refresh");
        
        // Token refreshed successfully
        isRefreshing = false;
        processQueue(null);
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        isRefreshing = false;
        processQueue(refreshError);
     
        const currentPath = router.currentRoute.value.fullPath;
        router.push({
          name: 'login',
          query: { redirect: currentPath }
        });
        
        return Promise.reject(refreshError);
      }
    }

    // For other 401 errors, redirect to login
    if (error.response?.status === 401) {
      const currentPath = router.currentRoute.value.fullPath;
      router.push({
        name: 'login',
        query: { redirect: currentPath }
      });
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