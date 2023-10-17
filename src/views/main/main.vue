<template>
  <div class="main">
    <el-container class="container">
      <el-aside :width="isFold ? '66px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="onFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'

const isFold = ref(false)
const onFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  .container {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      transition: width 0.6s ease;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
