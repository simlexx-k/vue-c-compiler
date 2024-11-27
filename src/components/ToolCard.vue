<template>
  <div class="tool-card" :class="{ 'tool-card--active': isHovered }" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="tool-card__glow"></div>
    <div class="tool-header">
      <div class="icon-wrapper">
        <img :src="tool.icon" :alt="tool.name">
      </div>
      <h2>{{ tool.name }}</h2>
    </div>
    <p class="tool-description">{{ tool.description }}</p>
    <FeatureList :features="tool.features" />
    <LaunchButton 
      :toolName="tool.name" 
      @click="$emit('launch', tool.id)"
      :isHovered="isHovered"
    />
    <div class="tool-card__background">
      <div class="grid-pattern"></div>
    </div>
  </div>
</template>

<script>
import FeatureList from './FeatureList.vue'
import LaunchButton from './LaunchButton.vue'

export default {
  name: 'ToolCard',
  components: {
    FeatureList,
    LaunchButton
  },
  props: {
    tool: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isHovered: false
    }
  }
}
</script>

<style scoped>
.tool-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: clamp(12px, 2vw, 16px);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-card--active {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.tool-card__glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(100, 255, 218, 0),
    rgba(100, 255, 218, 0.8),
    rgba(100, 255, 218, 0)
  );
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.tool-card--active .tool-card__glow {
  transform: translateX(100%);
}

.icon-wrapper {
  background: rgba(100, 255, 218, 0.1);
  padding: clamp(0.75rem, 2vw, 1rem);
  border-radius: clamp(12px, 2vw, 16px);
  width: clamp(48px, 8vw, 64px);
  height: clamp(48px, 8vw, 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.tool-card--active .icon-wrapper {
  transform: scale(1.1);
}

.icon-wrapper img {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.3));
}

.tool-card__background {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.grid-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  transform: rotate(-5deg) scale(1.5);
}

.tool-card--active .tool-card__background {
  opacity: 0.2;
}

.tool-header {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  flex-wrap: wrap;
}

.tool-description {
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.6;
}

@media (max-width: 480px) {
  .tool-card--active {
    transform: translateY(-4px); /* Reduced movement on mobile */
  }
  
  .tool-header h2 {
    font-size: 1.25rem;
  }
}

@media (hover: none) {
  /* Touch device optimizations */
  .tool-card:active {
    transform: translateY(-4px);
  }
  
  .tool-card__glow {
    display: none; /* Remove glow effect on touch devices */
  }
}
</style> 