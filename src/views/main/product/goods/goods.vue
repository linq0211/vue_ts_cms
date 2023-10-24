<template>
  <div class="page">
    <page-search
      :search-config="searchConfig"
      @query-click="onQueryClick"
      @reset-click="onResetClick"
    />
    <page-content ref="contentRef" :content-config="contentConfig">
      <template #name="scope">
        <span class="nameSpan">{{ scope.row.name }}</span>
      </template>
      <template #desc="scope">
        <span class="descSpan">{{ scope.row.desc }}</span>
      </template>
      <template #img="scope">
        <img class="img" :src="scope.row.imgUrl" alt="" />
      </template>
    </page-content>
    <!-- <page-modal ref="modalRef" :modal-config="modalConfig">
      <template #img>
        <input type="file" />
      </template>
    </page-modal> -->
  </div>
</template>

<script setup lang="ts" name="user">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import usePageContent from '@/hooks/usePageContent'

const { contentRef, onQueryClick, onResetClick } = usePageContent()
</script>

<style scoped lang="less">
.page {
  border-radius: 8px;
  overflow: hidden;
  .nameSpan {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .descSpan {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    width: 40px;
  }
}
</style>
