<template>
  <a 
    :href="whatsappUrl" 
    :class="[
      'fixed bottom-8 right-8 bg-[#25D366] text-white w-16 h-16 rounded-full',
      'flex items-center justify-center shadow-lg cursor-pointer z-[1000]',
      'transition-all duration-300 ease-in-out hover:bg-[#128C7E]',
      'hover:scale-110 hover:shadow-xl group',
      'md:bottom-8 md:right-8 max-md:w-12 max-md:h-12 max-md:bottom-20 max-md:right-5',
      { 'animate-pulse-ring': showPulse }
    ]"
    target="_blank" 
    rel="noopener noreferrer"
    :aria-label="ariaLabel"
  >
    <!-- Tooltip -->
    <span 
      class="absolute right-[70px] bg-gray-800 text-white px-3 py-2 rounded-md
             whitespace-nowrap opacity-0 invisible group-hover:opacity-100 
             group-hover:visible transition-all duration-300 text-sm
             max-md:hidden"
    >
      {{ tooltipText }}
    </span>

    <!-- WhatsApp Icon -->
    <svg 
      class="w-8 h-8 fill-white max-md:w-7 max-md:h-7" 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.409 1.417-5.267-0.316-0.523c-1.407-2.279-2.144-4.908-2.144-7.605 0-7.51 6.11-13.653 13.6-13.653s13.867 6.143 13.867 13.653c0 7.51-6.377 13.653-13.867 13.653zM21.387 18.227c-0.292-0.146-1.728-0.854-1.997-0.951-0.268-0.097-0.463-0.146-0.658 0.146s-0.756 0.951-0.927 1.145c-0.171 0.195-0.342 0.219-0.634 0.073s-1.237-0.456-2.355-1.453c-0.871-0.78-1.458-1.742-1.629-2.034s-0.018-0.449 0.128-0.595c0.131-0.131 0.292-0.342 0.439-0.512s0.195-0.293 0.293-0.488c0.098-0.195 0.049-0.366-0.024-0.512s-0.658-1.587-0.902-2.175c-0.238-0.573-0.479-0.495-0.658-0.504-0.171-0.008-0.366-0.010-0.561-0.010s-0.512 0.073-0.78 0.366c-0.268 0.293-1.024 1.001-1.024 2.441s1.048 2.833 1.195 3.028c0.146 0.195 2.064 3.148 5.001 4.417 0.699 0.301 1.244 0.481 1.669 0.615 0.703 0.223 1.342 0.192 1.847 0.116 0.564-0.084 1.728-0.707 1.972-1.39s0.244-1.268 0.171-1.39c-0.073-0.122-0.268-0.195-0.56-0.341z"/>
    </svg>
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  phoneNumber: {
    type: String,
    required: true,
    default: '1234567890'
  },
  message: {
    type: String,
    default: "Hello, I'm interested in your services"
  },
  tooltipText: {
    type: String,
    default: 'Chat with us'
  },
  showPulse: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Chat on WhatsApp'
  }
});

const whatsappUrl = computed(() => {
  const encodedMessage = encodeURIComponent(props.message);
  return `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`;
});
</script>

<style scoped>
/* Custom pulse ring animation */
@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}

.animate-pulse-ring {
  animation: pulse-ring 2s infinite;
}
</style>