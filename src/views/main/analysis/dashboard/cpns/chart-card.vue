<template>
  <div class="chart-card">
    <div class="header">
      <span>{{ header }}</span>
    </div>
    <div class="content">
      <slot>
        <span>默认内容</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  header?: string
}
withDefaults(defineProps<IProps>(), {
  header: '卡片头部标题'
})
</script>

<style scoped lang="less">
.chart-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .header {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 20px;
    font-size: 13px;
  }
  .content {
    padding: 10px 20px;
    font-size: 13px;
  }
}
</style>
