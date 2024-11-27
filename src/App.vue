<template>
  <div class="app-container">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const router = useRouter()
    
    return {
      router
    }
  },
  methods: {
    launchTool(toolId) {
      if (toolId === 1) {
        this.router.push('/c-code-share')
      } else if (toolId === 2) {
        this.router.push('/c-code-executor')
      }
    }
  }
}
</script>

<style>
:root {
  --navbar-height: 64px;
  --navbar-height-mobile: 56px;
}

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.landing-page {
  padding-top: 60px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f, #112240);
  color: white;
  padding: clamp(1rem, 3vw, 2rem);
  position: relative;
  overflow: hidden;
}

.landing-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(100, 255, 218, 0.15),
    transparent 70%
  );
  pointer-events: none;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
  position: relative;
  z-index: 1;
}

/* Mobile-first media queries */
@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
}

/* Tablet adjustments */
@media (min-width: 481px) and (max-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

/* Ensure proper spacing on larger screens */
@media (min-width: 1440px) {
  .tools-grid {
    gap: 3rem;
  }
}

/* Add utility classes for screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Add smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}

/* Prevent content shift on mobile when scrollbar appears */
html {
  scrollbar-gutter: stable;
}

/* Improve touch targets on mobile */
@media (max-width: 768px) {
  button,
  a {
    min-height: 44px;
    min-width: 44px;
  }
}

.app-container {
  min-height: 100vh;
}

.landing-page {
  padding-top: 60px;
}

/* Ensure proper z-index stacking */
.landing-page {
  position: relative;
  z-index: 1;
}

/* Add smooth transition for mobile menu */
@media (max-width: 768px) {
  body {
    overflow-x: hidden;
  }
}

/* Ensure the top padding is consistent across breakpoints */
@media (max-width: 768px) {
  .landing-page {
    padding-top: 50px;
  }
}
</style>
