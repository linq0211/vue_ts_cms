<template>
  <div class="main-header">
    <div class="icon" @click="onIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'expand' : 'fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="crumb">面包屑</div>
      <div class="info">
        <header-info/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './cpns/header-info.vue';

const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const onIconClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-left: 5px;
    padding: 0 10px;
  }
}
</style>
