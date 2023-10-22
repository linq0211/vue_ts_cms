<template>
  <div class="page">
    <page-search
      :search-config="searchConfig"
      @query-click="onQueryClick"
      @reset-click="onResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @add-click="onAddClick"
      @edit-click="onEditClick"
    />
    <page-modal ref="modalRef" :modal-config="modalConfig" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
const { contentRef, onQueryClick, onResetClick } = usePageContent()
const { modalRef, onAddClick, onEditClick } = usePageModal()
</script>

<style scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
