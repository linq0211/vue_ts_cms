<template>
  <div class="page">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
