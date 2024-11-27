<template>
  <ul class="feature-list">
    <li v-for="feature in features" :key="feature">
      <span class="feature-bullet">▹</span> {{ feature }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FeatureList',
  props: {
    features: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(1.5rem, 4vw, 2rem) 0;
  display: grid;
  gap: clamp(0.375rem, 1vw, 0.5rem);
}

.feature-list li {
  font-size: clamp(0.875rem, 2vw, 1rem);
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
}

.feature-bullet {
  color: #64ffda;
  margin-right: 10px;
}

@media (max-width: 480px) {
  .feature-list {
    grid-template-columns: 1fr; /* Stack features vertically on mobile */
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .feature-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style> 