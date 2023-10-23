<template>
  <div class="list">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="list">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped>
.list {
  border-radius: 8px;
  overflow: hidden;
}
</style>
