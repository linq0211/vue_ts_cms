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
    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useSystemStore from '@/store/main/system/system'

import pageSearch from '@/components/page-search/page-search.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

// 获取组件实例
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
const { contentRef, onQueryClick, onResetClick } = usePageContent()
const { modalRef, onAddClick, onEditClick } = usePageModal()

// 页面文件中使用配置文件时，动态将options数据传递给配置文件，最后再传递给重构后的 modal 组件
const modalConfigRef = computed(() => {
  const systemStore = useSystemStore()
  // 获取部门列表数据进行格式化
  const departments = systemStore.departmentList.map((item: any) => {
    return { label: item.name, value: item.id }
  })
  // 动态传递options数据
  modalConfig.formItem.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})
</script>

<style scoped lang="less">
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
