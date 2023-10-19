<template>
  <div class="user">
    <user-search @query-click="onQueryClick" @reset-click="onResetClick" />
    <user-content
      ref="contentRef"
      @add-click="onAddClick"
      @edit-click="onEditClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import userSearch from './cpns/user-search.vue'
import userContent from './cpns/user-content.vue'
import userModal from './cpns/user-modal.vue'

// 获取组件实例
const contentRef = ref<InstanceType<typeof userContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()

// 对search组件传来的事件进行响应
const onResetClick = () => {
  contentRef.value?.postUserListData()
}
const onQueryClick = (formData: any) => {
  contentRef.value?.postUserListData(formData)
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
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
