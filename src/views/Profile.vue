<template>
  <div class="min-h-screen" style="background-color: #f3f2f2;">
    <!-- Header Section -->
    <div class="border-b" style="background-color: #0d000a; border-color: rgba(254, 221, 0, 0.2);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-bold tracking-tight" style="color: #f3f2f2; letter-spacing: -0.025em;">My Profile</h1>
            <p class="mt-1 text-sm opacity-80 font-medium" style="color: #f3f2f2;">Manage your account information and preferences</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-4 sm:mt-0 flex space-x-3">
            <button 
              v-if="!isEditing"
              @click="startEditing"
              class="flex items-center justify-center px-4 py-3 rounded-sm font-semibold transition-all duration-200 border-2" 
              style="background-color: transparent; color: #f3f2f2; border-color: rgba(254, 221, 0, 0.6); font-weight: 600;"
            >
              <i class="pi pi-pencil mr-2"></i>
              <span>Edit Profile</span>
            </button>
            
            <template v-if="isEditing">
              <button 
                @click="cancelEditing"
                class="flex items-center justify-center px-4 py-3 rounded-sm font-semibold transition-all duration-200 border-2" 
                style="background-color: transparent; color: #f3f2f2; border-color: rgba(243, 242, 242, 0.6); font-weight: 600;"
              >
                <i class="pi pi-times mr-2"></i>
                <span>Cancel</span>
              </button>
              
              <button 
                @click="saveProfile"
                :disabled="!canSave || isSaving"
                class="flex items-center justify-center px-4 py-3 rounded-sm font-semibold transition-all duration-200" 
                :style="{
                  backgroundColor: (canSave && !isSaving) ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                  color: '#0d000a',
                  fontWeight: '600'
                }"
              >
                <i v-if="!isSaving" class="pi pi-save mr-2"></i>
                <div v-if="isSaving" class="animate-spin rounded-full h-4 w-4 border-2 border-opacity-30 mr-2" 
                     style="border-color: #0d000a; border-top-color: transparent;"></div>
                <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="rounded-md border border-opacity-20 overflow-hidden sticky top-8" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            
            <!-- Profile Header -->
            <div class="px-6 py-8 text-center border-b border-opacity-10" 
                 style="background: linear-gradient(135deg, rgba(254, 221, 0, 0.1) 0%, rgba(254, 221, 0, 0.05) 100%); border-color: #0d000a;">
              
              <!-- Profile Picture -->
              <div class="relative inline-block mb-4">
                <div class="w-24 h-24 rounded-full overflow-hidden border-4 mx-auto" 
                     style="border-color: #fedd00; background: linear-gradient(135deg, #fedd00 0%, #f4d03f 100%);">
                  <img v-if="userProfile.avatar" 
                       :src="userProfile.avatar" 
                       :alt="userProfile.fullName"
                       class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <span class="text-2xl font-bold" style="color: #0d000a;">
                      {{ getInitials(userProfile.fullName) }}
                    </span>
                  </div>
                </div>
                
                <!-- Edit Avatar Button -->
                <button v-if="isEditing"
                        @click="uploadAvatar"
                        class="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style="background-color: #fedd00; color: #0d000a; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <i class="pi pi-camera text-sm"></i>
                </button>
              </div>
              
              <h2 class="text-xl font-bold tracking-tight mb-1" style="color: #0d000a; font-weight: 700;">
                {{ userProfile.fullName }}
              </h2>
              <p class="text-sm opacity-70 font-medium mb-3" style="color: #0d000a;">
                {{ userProfile.email }}
              </p>
              
              <!-- Status Badge -->
              <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                   style="background-color: rgba(34, 197, 94, 0.1); color: #22c55e;">
                <div class="w-2 h-2 rounded-full mr-2" style="background-color: #22c55e;"></div>
                Active Account
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Member Since</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ userProfile.memberSince }}</span>
              </div>
              
              <div class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Total Purchases</span>
                <span class="text-sm font-medium" style="color: #0d000a;">{{ userProfile.totalPurchases }}</span>
              </div>
              
              <div class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Current Balance</span>
                <span class="text-sm font-bold" style="color: #0d000a;">${{ userProfile.currentBalance.toLocaleString() }}</span>
              </div>
              
              <hr class="border-opacity-10" style="border-color: #0d000a;">
              
              <div class="flex items-center justify-between py-2">
                <span class="text-sm opacity-70" style="color: #0d000a;">Account Status</span>
                <span class="text-sm font-semibold" style="color: #22c55e;">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Personal Information -->
          <div class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h3 class="text-lg font-semibold tracking-tight" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-user mr-2" style="color: #fedd00;"></i>
                Personal Information
              </h3>
              <p class="text-sm opacity-60 mt-1 font-medium" style="color: #0d000a;">Update your personal details</p>
            </div>

            <div class="p-6 space-y-6">
              
              <!-- Full Name -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold" style="color: #0d000a;">Full Name</label>
                <input 
                  v-model="editableProfile.fullName"
                  type="text"
                  :disabled="!isEditing"
                  class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                  :style="{
                    backgroundColor: '#f3f2f2',
                    borderColor: 'rgba(13, 0, 10, 0.2)',
                    color: '#0d000a'
                  }"
                  @focus="$event.target.style.borderColor = '#fedd00'"
                  @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold" style="color: #0d000a;">Email Address</label>
                <div class="relative">
                  <input 
                    v-model="editableProfile.email"
                    type="email"
                    :disabled="!isEditing"
                    class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    :style="{
                      backgroundColor: '#f3f2f2',
                      borderColor: (isEditing && emailError) ? '#ef4444' : 'rgba(13, 0, 10, 0.2)',
                      color: '#0d000a'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'"
                    @blur="$event.target.style.borderColor = (emailError ? '#ef4444' : 'rgba(13, 0, 10, 0.2)')"
                  />
                  <div v-if="isEditing && isValidEmail && editableProfile.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <i class="pi pi-check-circle text-green-500"></i>
                  </div>
                </div>
                <p v-if="isEditing && emailError" class="text-sm text-red-500 font-medium">{{ emailError }}</p>
              </div>

              <!-- Phone Number -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold" style="color: #0d000a;">
                  Phone Number 
                  <span class="text-xs opacity-60 font-normal">(Ghana only)</span>
                </label>
                <div class="relative">
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                    <div class="flex items-center">
                      <!-- Ghana Flag -->
                      <div class="w-5 h-3 rounded-sm mr-2" 
                           style="background: linear-gradient(to right, #ce1126 33%, #fcd116 33% 66%, #006b3f 66%); position: relative;">
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full"></div>
                      </div>
                      <span class="text-sm font-medium opacity-70" style="color: #0d000a;">+233</span>
                      <div class="w-px h-4 mx-2 opacity-30" style="background-color: #0d000a;"></div>
                    </div>
                  </div>
                  
                  <input 
                    v-model="editableProfile.phone"
                    type="tel"
                    :disabled="!isEditing"
                    placeholder="24 123 4567"
                    class="w-full py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    :style="{
                      backgroundColor: '#f3f2f2',
                      borderColor: (isEditing && phoneError) ? '#ef4444' : 'rgba(13, 0, 10, 0.2)',
                      color: '#0d000a',
                      paddingLeft: '90px',
                      paddingRight: '16px',
                      fontFamily: 'monospace'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'"
                    @blur="$event.target.style.borderColor = (phoneError ? '#ef4444' : 'rgba(13, 0, 10, 0.2)')"
                    @input="formatPhoneNumber"
                    maxlength="11"
                  />
                  <div v-if="isEditing && isValidPhone && editableProfile.phone" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <i class="pi pi-check-circle text-green-500"></i>
                  </div>
                </div>
                <p v-if="isEditing && phoneError" class="text-sm text-red-500 font-medium">{{ phoneError }}</p>
              </div>

              <!-- Date of Birth and Gender -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold" style="color: #0d000a;">Date of Birth</label>
                  <input 
                    v-model="editableProfile.dateOfBirth"
                    type="date"
                    :disabled="!isEditing"
                    class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    :style="{
                      backgroundColor: '#f3f2f2',
                      borderColor: 'rgba(13, 0, 10, 0.2)',
                      color: '#0d000a'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'"
                    @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-semibold" style="color: #0d000a;">Gender</label>
                  <select 
                    v-model="editableProfile.gender"
                    :disabled="!isEditing"
                    class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    :style="{
                      backgroundColor: '#f3f2f2',
                      borderColor: 'rgba(13, 0, 10, 0.2)',
                      color: '#0d000a'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'"
                    @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h3 class="text-lg font-semibold tracking-tight" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-map-marker mr-2" style="color: #fedd00;"></i>
                Address Information
              </h3>
              <p class="text-sm opacity-60 mt-1 font-medium" style="color: #0d000a;">Your residential address</p>
            </div>

            <div class="p-6 space-y-6">
              
              <!-- Street Address -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold" style="color: #0d000a;">Street Address</label>
                <input 
                  v-model="editableProfile.address.street"
                  type="text"
                  :disabled="!isEditing"
                  placeholder="Enter your street address"
                  class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                  :style="{
                    backgroundColor: '#f3f2f2',
                    borderColor: 'rgba(13, 0, 10, 0.2)',
                    color: '#0d000a'
                  }"
                  @focus="$event.target.style.borderColor = '#fedd00'"
                  @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                />
              </div>

              <!-- City and Region -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold" style="color: #0d000a;">City</label>
                  <input 
                    v-model="editableProfile.address.city"
                    type="text"
                    :disabled="!isEditing"
                    placeholder="Enter city"
                    class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    :style="{
                      backgroundColor: '#f3f2f2',
                      borderColor: 'rgba(13, 0, 10, 0.2)',
                      color: '#0d000a'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'"
                    @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-semibold" style="color: #0d000a;">Region</label>
                  <select 
                    v-model="editableProfile.address.region"
                    :disabled="!isEditing"
                    class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    :style="{
                      backgroundColor: '#f3f2f2',
                      borderColor: 'rgba(13, 0, 10, 0.2)',
                      color: '#0d000a'
                    }"
                    @focus="$event.target.style.borderColor = '#fedd00'"
                    @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                  >
                    <option value="">Select Region</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Western">Western</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Volta">Volta</option>
                    <option value="Northern">Northern</option>
                    <option value="Upper East">Upper East</option>
                    <option value="Upper West">Upper West</option>
                    <option value="Brong-Ahafo">Brong-Ahafo</option>
                    <option value="Western North">Western North</option>
                    <option value="Ahafo">Ahafo</option>
                    <option value="Bono East">Bono East</option>
                    <option value="Oti">Oti</option>
                    <option value="North East">North East</option>
                    <option value="Savannah">Savannah</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="rounded-md border border-opacity-20 overflow-hidden" 
               style="background-color: #f3f2f2; border-color: #0d000a;">
            
            <div class="px-6 py-4 border-b border-opacity-10" 
                 style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
              <h3 class="text-lg font-semibold tracking-tight" style="color: #0d000a; font-weight: 600;">
                <i class="pi pi-shield mr-2" style="color: #fedd00;"></i>
                Security & Preferences
              </h3>
              <p class="text-sm opacity-60 mt-1 font-medium" style="color: #0d000a;">Manage your security and notification preferences</p>
            </div>

            <div class="p-6 space-y-6">
              
              <!-- Change Password Button -->
              <div class="flex items-center justify-between p-4 rounded-lg border border-opacity-10" 
                   style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
                <div class="flex items-center">
                  <i class="pi pi-lock text-lg mr-3" style="color: #fedd00;"></i>
                  <div>
                    <h4 class="font-semibold text-sm" style="color: #0d000a;">Password</h4>
                    <p class="text-xs opacity-60" style="color: #0d000a;">Last changed 3 months ago</p>
                  </div>
                </div>
                <button 
                  @click="openChangePassword"
                  class="px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 hover:scale-105"
                  style="background-color: #fedd00; color: #0d000a;"
                >
                  Change Password
                </button>
              </div>

              <!-- Notification Preferences -->
              <div class="space-y-4">
                <h4 class="font-semibold text-sm" style="color: #0d000a;">Notification Preferences</h4>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <i class="pi pi-envelope text-lg mr-3 opacity-70" style="color: #0d000a;"></i>
                      <div>
                        <span class="text-sm font-medium" style="color: #0d000a;">Email Notifications</span>
                        <p class="text-xs opacity-60" style="color: #0d000a;">Receive updates via email</p>
                      </div>
                    </div>
                    <button 
                      @click="togglePreference('emailNotifications')"
                      :disabled="!isEditing"
                      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                      :style="{
                        backgroundColor: editableProfile.preferences?.emailNotifications ? '#fedd00' : '#e5e7eb',
                        focusRingColor: '#fedd00'
                      }"
                    >
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                            :style="{
                              transform: editableProfile.preferences?.emailNotifications ? 'translateX(24px)' : 'translateX(4px)'
                            }">
                      </span>
                    </button>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <i class="pi pi-mobile text-lg mr-3 opacity-70" style="color: #0d000a;"></i>
                      <div>
                        <span class="text-sm font-medium" style="color: #0d000a;">SMS Notifications</span>
                        <p class="text-xs opacity-60" style="color: #0d000a;">Receive updates via SMS</p>
                      </div>
                    </div>
                    <button 
                      @click="togglePreference('smsNotifications')"
                      :disabled="!isEditing"
                      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                      :style="{
                        backgroundColor: editableProfile.preferences?.smsNotifications ? '#fedd00' : '#e5e7eb',
                        focusRingColor: '#fedd00'
                      }"
                    >
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                            :style="{
                              transform: editableProfile.preferences?.smsNotifications ? 'translateX(24px)' : 'translateX(4px)'
                            }">
                      </span>
                    </button>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <i class="pi pi-bell text-lg mr-3 opacity-70" style="color: #0d000a;"></i>
                      <div>
                        <span class="text-sm font-medium" style="color: #0d000a;">Marketing Communications</span>
                        <p class="text-xs opacity-60" style="color: #0d000a;">Receive promotional offers</p>
                      </div>
                    </div>
                    <button 
                      @click="togglePreference('marketingEmails')"
                      :disabled="!isEditing"
                      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                      :style="{
                        backgroundColor: editableProfile.preferences?.marketingEmails ? '#fedd00' : '#e5e7eb',
                        focusRingColor: '#fedd00'
                      }"
                    >
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                            :style="{
                              transform: editableProfile.preferences?.marketingEmails ? 'translateX(24px)' : 'translateX(4px)'
                            }">
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="rounded-2xl shadow-2xl max-w-sm w-full border border-opacity-20" 
           style="background-color: rgba(243, 242, 242, 0.95); border-color: rgba(254, 221, 0, 0.3);">
        <div class="p-8 text-center">
          <div class="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" 
               style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);">
            <i class="pi pi-check text-3xl text-green-600"></i>
          </div>
          <h3 class="text-xl font-bold tracking-tight mb-3" style="color: #0d000a; font-weight: 700;">Profile Updated!</h3>
          <p class="text-sm opacity-70 mb-6 font-medium" style="color: #0d000a;">
            Your profile information has been successfully updated.
          </p>
          <button @click="closeSuccessModal" 
                  class="w-full py-3 rounded-xl font-bold tracking-wide hover:scale-105 transition-all duration-200"
                  style="background-color: #fedd00; color: #0d000a; box-shadow: 0 10px 25px rgba(254, 221, 0, 0.3);">
            Continue
          </button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style="background-color: rgba(0, 0, 0, 0.7);">
      <div class="rounded-2xl shadow-2xl max-w-md w-full border border-opacity-20" 
           style="background-color: rgba(243, 242, 242, 0.95); border-color: rgba(254, 221, 0, 0.3);">
        <div class="px-6 py-4 border-b border-opacity-10 flex items-center justify-between" 
             style="background-color: rgba(13, 0, 10, 0.02); border-color: #0d000a;">
          <h3 class="text-xl font-bold tracking-tight" style="color: #0d000a; font-weight: 700;">Change Password</h3>
          <button @click="closePasswordModal" class="text-gray-500 hover:text-gray-700">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>
        
        <form @submit.prevent="changePassword" class="p-6 space-y-4">
          <!-- Current Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold" style="color: #0d000a;">Current Password</label>
            <div class="relative">
              <input 
                v-model="passwordForm.current"
                :type="showCurrentPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none pr-12"
                style="background-color: #f3f2f2; border-color: #0d000a; color: #0d000a;"
                @focus="$event.target.style.borderColor = '#fedd00'"
                @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                required
              />
              <button 
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <i :class="showCurrentPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" 
                   class="text-lg opacity-50 hover:opacity-80" 
                   style="color: #0d000a;"></i>
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold" style="color: #0d000a;">New Password</label>
            <div class="relative">
              <input 
                v-model="passwordForm.new"
                :type="showNewPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none pr-12"
                style="background-color: #f3f2f2; border-color: #0d000a; color: #0d000a;"
                @focus="$event.target.style.borderColor = '#fedd00'"
                @blur="$event.target.style.borderColor = 'rgba(13, 0, 10, 0.2)'"
                required
              />
              <button 
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <i :class="showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" 
                   class="text-lg opacity-50 hover:opacity-80" 
                   style="color: #0d000a;"></i>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold" style="color: #0d000a;">Confirm New Password</label>
            <div class="relative">
              <input 
                v-model="passwordForm.confirm"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 rounded-md border border-opacity-20 transition-all duration-200 focus:outline-none pr-12"
                :style="{
                  backgroundColor: '#f3f2f2',
                  borderColor: (passwordForm.new && passwordForm.confirm && passwordForm.new !== passwordForm.confirm) ? '#ef4444' : 'rgba(13, 0, 10, 0.2)',
                  color: '#0d000a'
                }"
                @focus="$event.target.style.borderColor = '#fedd00'"
                @blur="$event.target.style.borderColor = (passwordForm.new !== passwordForm.confirm ? '#ef4444' : 'rgba(13, 0, 10, 0.2)')"
                required
              />
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" 
                   class="text-lg opacity-50 hover:opacity-80" 
                   style="color: #0d000a;"></i>
              </button>
            </div>
            <p v-if="passwordForm.new && passwordForm.confirm && passwordForm.new !== passwordForm.confirm" 
               class="text-sm text-red-500 font-medium">Passwords do not match</p>
          </div>

          <div class="flex space-x-3 pt-4">
            <button 
              type="button"
              @click="closePasswordModal"
              class="flex-1 py-3 rounded-md font-semibold transition-all duration-200 border-2"
              style="background-color: transparent; color: #0d000a; border-color: rgba(13, 0, 10, 0.3);"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="!canChangePassword || isChangingPassword"
              class="flex-1 py-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center"
              :style="{
                backgroundColor: (canChangePassword && !isChangingPassword) ? '#fedd00' : 'rgba(254, 221, 0, 0.3)',
                color: '#0d000a',
                opacity: (!canChangePassword || isChangingPassword) ? 0.5 : 1
              }"
            >
              <div v-if="isChangingPassword" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-2 border-opacity-30 mr-2" 
                     style="border-color: #0d000a; border-top-color: transparent;"></div>
                <span>Updating...</span>
              </div>
              <span v-else>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Reactive data
const isEditing = ref(false)
const isSaving = ref(false)
const showSuccessModal = ref(false)
const showPasswordModal = ref(false)
const isChangingPassword = ref(false)

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// User profile data
const userProfile = ref({
  fullName: 'John Kwame Asante',
  email: 'john.asante@example.com',
  phone: '24 123 4567',
  avatar: '',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  memberSince: 'January 2023',
  totalPurchases: 47,
  currentBalance: 25750.50,
  address: {
    street: '123 Liberation Road',
    city: 'Accra',
    region: 'Greater Accra'
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false
  }
})

// Editable profile (copy of user profile for editing)
const editableProfile = ref({})

// Password form
const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

// Ghana mobile network prefixes
const ghanaPrefixes = [
  '024', '054', '055', '059', // MTN
  '020', '050', // Vodafone
  '027', '057', '026', '056'  // AirtelTigo
]

// Initialize editable profile
const initializeEditableProfile = () => {
  editableProfile.value = JSON.parse(JSON.stringify(userProfile.value))
}

// Computed properties
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(editableProfile.value.email || '')
})

const isValidPhone = computed(() => {
  const cleanPhone = (editableProfile.value.phone || '').replace(/\D/g, '')
  if (cleanPhone.length === 9) {
    const prefix = cleanPhone.substring(0, 3)
    return ghanaPrefixes.includes(prefix)
  }
  return false
})

const emailError = computed(() => {
  if (editableProfile.value.email && !isValidEmail.value) {
    return 'Please enter a valid email address'
  }
  return ''
})

const phoneError = computed(() => {
  if (editableProfile.value.phone) {
    const cleanPhone = editableProfile.value.phone.replace(/\D/g, '')
    
    if (cleanPhone.length === 0) return ''
    
    if (cleanPhone.length < 9) {
      return 'Phone number must be 9 digits'
    }
    
    if (cleanPhone.length > 9) {
      return 'Phone number cannot exceed 9 digits'
    }
    
    const prefix = cleanPhone.substring(0, 3)
    if (!ghanaPrefixes.includes(prefix)) {
      return 'Please enter a valid Ghana mobile number'
    }
  }
  return ''
})

const canSave = computed(() => {
  return isValidEmail.value && 
         isValidPhone.value && 
         editableProfile.value.fullName?.trim() &&
         hasChanges.value
})

const hasChanges = computed(() => {
  return JSON.stringify(userProfile.value) !== JSON.stringify(editableProfile.value)
})

const canChangePassword = computed(() => {
  return passwordForm.current && 
         passwordForm.new && 
         passwordForm.confirm &&
         passwordForm.new === passwordForm.confirm &&
         passwordForm.new.length >= 8
})

// Methods
const getInitials = (name) => {
  return name?.split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'JA'
}

const startEditing = () => {
  initializeEditableProfile()
  isEditing.value = true
}

const cancelEditing = () => {
  initializeEditableProfile()
  isEditing.value = false
}

const saveProfile = async () => {
  if (!canSave.value) return
  
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update user profile
    userProfile.value = JSON.parse(JSON.stringify(editableProfile.value))
    
    isEditing.value = false
    showSuccessModal.value = true
    
  } catch (error) {
    alert('Failed to save profile. Please try again.')
  } finally {
    isSaving.value = false
  }
}

const formatPhoneNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  
  // Limit to 9 digits
  if (value.length > 9) {
    value = value.substring(0, 9)
  }
  
  // Format as XX XXX XXXX
  if (value.length >= 6) {
    value = value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5)
  } else if (value.length >= 3) {
    value = value.substring(0, 2) + ' ' + value.substring(2)
  }
  
  editableProfile.value.phone = value
}

const togglePreference = (preference) => {
  if (isEditing.value && editableProfile.value.preferences) {
    editableProfile.value.preferences[preference] = !editableProfile.value.preferences[preference]
  }
}

const uploadAvatar = () => {
  // Create file input element
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        editableProfile.value.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

const openChangePassword = () => {
  passwordForm.current = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
  showPasswordModal.value = true
}

const closePasswordModal = () => {
  showPasswordModal.value = false
}

const changePassword = async () => {
  if (!canChangePassword.value) return
  
  isChangingPassword.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    closePasswordModal()
    showSuccessModal.value = true
    
  } catch (error) {
    alert('Failed to change password. Please try again.')
  } finally {
    isChangingPassword.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

// Initialize on component mount
initializeEditableProfile()
</script>

<style scoped>
/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-1px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Input field enhancements */
input, select {
  font-size: 16px; /* Prevents zoom on iOS */
}

input::placeholder {
  opacity: 0.6;
}

/* Disabled input styles */
input:disabled, select:disabled {
  background-color: rgba(243, 242, 242, 0.5) !important;
  cursor: not-allowed;
}

/* Focus ring for accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #fedd00;
  outline-offset: 2px;
}

/* Modal animations */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fixed {
  animation: modalFadeIn 0.3s ease-out;
}

/* Enhanced button states */
button:disabled {
  cursor: not-allowed;
  transform: none !important;
}

button:disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  button, input, select {
    min-height: 44px; /* Touch target size */
  }
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(254, 221, 0, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(254, 221, 0, 0.5);
}
</style>