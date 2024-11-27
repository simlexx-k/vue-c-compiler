<template>
  <header class="page-header">
    <div class="header-content">
      <h1 class="title">
        <span class="title-line">{{ title }}</span>
      </h1>
      <p class="tagline">{{ tagline }}</p>
      <div class="header-decoration">
        <div class="decoration-line"></div>
        <div class="decoration-dot"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: 'Coding Tools'
    },
    tagline: {
      type: String,
      default: 'Supercharge your development workflow'
    }
  }
}
</script>

<style scoped>
.page-header {
  text-align: center;
  padding: clamp(1.5rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 4rem);
  position: relative;
}

.header-content {
  position: relative;
  z-index: 1;
}

.title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  padding: 0 clamp(1rem, 3vw, 2rem);
  position: relative;
}

.title-line {
  background: linear-gradient(90deg, #64ffda, #45e6c4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.tagline {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #a8b2d1;
  max-width: min(90%, 600px);
  margin: 0 auto;
  line-height: 1.6;
  padding: 0 clamp(1rem, 3vw, 2rem);
}

.header-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  height: 100%;
  z-index: -1;
}

.decoration-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(100, 255, 218, 0.2),
    transparent
  );
}

.decoration-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #64ffda;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .tagline {
    font-size: 1.25rem;
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {
  .header-decoration {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .decoration-line {
    opacity: 0.5;
  }
  
  .decoration-dot {
    width: 4px;
    height: 4px;
  }
}
</style> 