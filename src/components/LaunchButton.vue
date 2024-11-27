<template>
  <button 
    @click="handleClick" 
    :disabled="loading"
    class="launch-button"
    :class="{ 'launch-button--active': isHovered }"
  >
    <span class="button-content">
      {{ loading ? 'Launching...' : `Launch ${toolName}` }}
      <span class="arrow" v-if="!loading">→</span>
      <span class="loader" v-else></span>
    </span>
    <span class="button-background"></span>
  </button>
</template>

<script>
export default {
  name: 'LaunchButton',
  props: {
    toolName: {
      type: String,
      required: true
    },
    isHovered: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleClick() {
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      this.loading = false;
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.launch-button {
  position: relative;
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
  border-radius: clamp(6px, 1.5vw, 8px);
  font-weight: 600;
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: auto; /* Push button to bottom of card */
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  color: #002119;
  transition: color 0.3s ease;
}

.button-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(100, 255, 218, 0.1),
    rgba(100, 255, 218, 0.2)
  );
  transition: opacity 0.3s ease;
  opacity: 0;
}

.launch-button--active .button-background {
  opacity: 1;
}

.arrow {
  transition: transform 0.3s ease;
}

.launch-button--active .arrow {
  transform: translateX(5px);
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid #64ffda;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.launch-button:disabled {
  opacity: 0.7;
  cursor: wait;
}

.launch-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid #64ffda;
  border-radius: 8px;
  opacity: 0.5;
}

/* Touch device optimizations */
@media (hover: none) {
  .launch-button:active .button-background {
    opacity: 1;
  }
  
  .launch-button:active .arrow {
    transform: translateX(5px);
  }
}

/* Smaller screens */
@media (max-width: 480px) {
  .launch-button {
    padding: 0.875rem 1.25rem;
  }
  
  .loader {
    width: 16px;
    height: 16px;
  }
}
</style> 