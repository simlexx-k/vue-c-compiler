<template>
  <div class="landing-page">
    <PageHeader />
    <main class="tools-grid">
      <ToolCard
        v-for="tool in tools"
        :key="tool.id"
        :tool="tool"
        @launch="launchTool"
      />
    </main>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'
import ToolCard from '../components/ToolCard.vue'
import { tools } from '../data/tools'

export default {
  name: 'HomePage',
  components: {
    PageHeader,
    ToolCard
  },
  data() {
    return {
      tools
    }
  },
  methods: {
  launchTool(toolId) {
    if (toolId === 1) {
      this.$router.push('/c-code-share') // Updated to the nested route
    } else if (toolId === 2) {
      this.$router.push('/c-code-executor') // Add this for the second tool
    }
  }
}
}
</script>

<style>
/* Move your existing landing page styles here */
</style> 