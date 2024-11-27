<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo">
        <span class="logo-text">DevTools</span>
      </router-link>

      <!-- Desktop Menu -->
      <div class="navbar__menu" :class="{ 'navbar__menu--active': isMenuOpen }">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="navbar__link"
          @click="closeMenu"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Hamburger Menu Button -->
      <button 
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height, 64px);
  background: #1e1e1e;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.navbar--scrolled {
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  height: 70px;
}

.navbar__container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 3vw, 2rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar__logo {
  text-decoration: none;
  color: #64ffda;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 1001;
}

.navbar__menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navbar__link {
  color: #ccd6f6;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
  position: relative;
}

.navbar__link:hover {
  color: #64ffda;
}

.navbar__link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #64ffda;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.navbar__link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.navbar__hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.navbar__hamburger span {
  width: 100%;
  height: 2px;
  background-color: #64ffda;
  transition: all 0.3s ease;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .navbar__hamburger {
    display: flex;
  }

  .navbar__menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 25, 47, 0.95);
    padding: 100px 2rem 2rem;
    width: min(75vw, 400px);
    flex-direction: column;
    gap: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .navbar__menu--active {
    transform: translateX(0);
  }

  .navbar__link {
    font-size: 1.1rem;
    width: 100%;
    text-align: center;
    padding: 1rem;
  }

  /* Hamburger Animation */
  .navbar__hamburger--active span:first-child {
    transform: translateY(9.5px) rotate(45deg);
  }

  .navbar__hamburger--active span:nth-child(2) {
    opacity: 0;
  }

  .navbar__hamburger--active span:last-child {
    transform: translateY(-9.5px) rotate(-45deg);
  }

  .navbar {
    height: var(--navbar-height-mobile, 56px);
  }
}

/* Tablet Adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  .navbar__menu {
    gap: 1.5rem;
  }
}

/* Prevent content shift when scrollbar appears */
.navbar__container {
  padding-right: calc(clamp(1rem, 3vw, 2rem) + var(--scrollbar-width, 0px));
}
</style> 