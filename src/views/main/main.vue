<template>
  <div class="main">
    <h2>main</h2>
    <button @click="onLoginOutClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'

const onLoginOutClick = () => {
  // 移除token
  localCache.removeCache(TOKEN)

  // 返回login页面
  router.push('/login')
}
</script>

<style scoped></style>
