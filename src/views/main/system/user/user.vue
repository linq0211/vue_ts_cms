<template>
  <div class="page">
    <page-search @query-click="onQueryClick" @reset-click="onResetClick" />
    <page-content
      ref="contentRef"
      @add-click="onAddClick"
      @edit-click="onEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from './cpns/page-search.vue'
import pageContent from './cpns/page-content.vue'
import pageModal from './cpns/page-modal.vue'

// 获取组件实例
const contentRef = ref<InstanceType<typeof pageContent>>()
const modalRef = ref<InstanceType<typeof pageModal>>()

// 对search组件传来的事件进行响应
const onResetClick = () => {
  contentRef.value?.postPageListData()
}
const onQueryClick = (formData: any) => {
  contentRef.value?.postPageListData(formData)
}

// 对content组件传来的事件进行响应
const onAddClick = () => {
  modalRef.value?.setDialogVisible(true)
}
const onEditClick = (itemData: any) => {
  modalRef.value?.setDialogVisible(false, itemData)
}
</script>

<style scoped lang="less">
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
