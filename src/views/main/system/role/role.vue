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
    <page-modal
      ref="modalRef"
      :modal-config="modalConfig"
      :other-info="otherInfo"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="allMenuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="onCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { nextTick } from 'vue'

// 点击新建时的回调函数 => 将树形控件内容置为空
const addCB = () => {
  treeRef.value?.setCheckedKeys([])
}

// 点击修改时的回调函数 => 获取子组件content发出事件中的参数itemData
const editCB = (itemData: any) => {
  // 点击修改按钮时，将该用户的菜单权限进行对应的显示
  nextTick(() => {
    const ids = mapMenuListToIds(itemData.menuList)
    // 点击修改按钮后，弹出的对话框默认显示目前选中的节点
    treeRef.value?.setCheckedKeys(ids)
  })
}

const { contentRef, onQueryClick, onResetClick } = usePageContent()
const { modalRef, onAddClick, onEditClick } = usePageModal(addCB, editCB)

// 展示树形控件的data
const systemStore = useSystemStore()
const treeRef = ref<InstanceType<typeof ElTree>>()
const { allMenuList } = storeToRefs(systemStore)

/**
 *  点击节点复选框后获取选中数据
 * @param check 该节点所对应的对象
 * @param halfCheck 树目前的选中状态对象
 */
const otherInfo = ref({})
const onCheck = (check: any, halfCheck: any) => {
  const menuList = [...halfCheck.checkedKeys, ...halfCheck.halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
