import { defineStore } from "pinia";
import apiClient from "../api/axios";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    userType: "",
    userData: {},
    isInitialized: false,
  }),
  actions: {
    async fetchUserType() {
      try {
          
        const response = await apiClient.get("/users/");
         if (response.status == 200) {
          this.userType = response.data.user_type
          this.userData = response.data
          this.isAuthenticated = true;
        }
        
      } catch (error) {
      } finally {
        this.isInitialized = true
      }
    },

    async logout() {
      try {
        await apiClient.post("users/auth/logout");
      } catch (error) {
        //
      } finally {
        this.isAuthenticated = false;
        this.userData = {} 
        this.userType = "";
      }
    },
  },
});
