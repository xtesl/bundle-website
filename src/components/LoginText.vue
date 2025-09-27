<template>
  <div class="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-md p-3 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      <!-- Left side: Icon and text -->
      <div class="flex items-center">
        <div class="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mr-3 flex-shrink-0">
          <i class="pi pi-user text-base sm:text-sm text-white"></i>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800">Get the Full Experience</p>
          <p class="text-xs text-gray-600">Login for personalized bundles & exclusive offers</p>
        </div>
      </div>
      
      <!-- Right side: Buttons -->
      <div class="flex space-x-2 w-full sm:w-auto">
        <RouterLink class="flex-1 sm:flex-none bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 
        text-white font-medium py-2 sm:py-1.5 px-4 sm:px-3 
        rounded text-sm sm:text-xs transition-all duration-200 flex items-center justify-center"
        to="/auth/login">
          <i class="pi pi-sign-in mr-1"></i>
          Login
        </RouterLink>
        <RouterLink class="flex-1 sm:flex-none border border-yellow-400 text-yellow-600 hover:bg-yellow-50 
        font-medium py-2 sm:py-1.5 px-4 sm:px-3 rounded text-sm sm:text-xs transition-all duration-200 
        flex items-center justify-center"
        to="/auth/register">
          <i class="pi pi-user-plus mr-1"></i>
          Sign Up
        </RouterLink>
      </div>
    </div>
  </div>
</template>