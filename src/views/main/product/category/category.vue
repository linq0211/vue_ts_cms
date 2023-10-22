<template>
  <div class="page">
    <page-search
      :search-config="searchConfig"
      @query-click="onQueryClick"
      @reset-click="onResetClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @add-click="onAddClick"
      @edit-click="onEditClick"
    />
    <page-modal ref="modalRef" :modal-config="modalConfig" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

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
