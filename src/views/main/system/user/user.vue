<template>
  <div class="user">
    <user-search />
    <user-content />
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './cpns/user-search.vue'
import userContent from './cpns/user-content.vue'
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
