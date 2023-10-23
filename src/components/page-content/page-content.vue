<template>
  <div class="page-content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header.title }}</h3>
      <el-button
        v-if="contentConfig.header.btnTitle && isCreate"
        type="primary"
        @click="onAddClick"
      >
        {{ contentConfig.header.btnTitle }}
      </el-button>
    </div>
    <div class="content">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        :row-key="contentConfig.childrenTree?.rowKey"
        :tree-props="contentConfig.childrenTree?.treeProps"
      >
        <template v-for="item in contentConfig.formItem" :key="item.prop">
          <template v-if="item.type === 'time'">
            <el-table-column
              align="center"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
              <template #default="scope">
                {{ formatDate(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column
              align="center"
              :label="item.label"
              :width="item.width"
            >
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  type="primary"
                  text
                  icon="editPen"
                  @click="onEditClick(scope.row)"
                >
                  修改
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  type="danger"
                  text
                  icon="delete"
                  @click="onDeleteClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column
              align="center"
              :prop="item.prop"
              :width="item.width"
              :label="item.label"
            >
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              align="center"
              :type="item.type"
              :prop="item.prop"
              :width="item.width"
              :label="item.label"
            />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @update:page-size="handleSizeChange"
        @update:current-page="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import formatDate from '@/utils/format'
import usePermission from '@/hooks/usePermission'

interface IProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle?: string
    }
    formItem: any[]
    childrenTree?: any
  }
}

// 向父组件发送事件/接收父组件传递参数
const emit = defineEmits(['add-click', 'edit-click'])
const props = defineProps<IProps>()

// 获取按钮权限
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)

// 获取store中的数据
const systemStore = useSystemStore()
// 监听 action 和它们的结果
// name 表示 action 名称
// after 表示在 promise 解决之后，允许你在 action 解决后执行一个回调函数
systemStore.$onAction(({ name, after }) => {
  after(() => {
    // 当执行add/edit/delete的action并且执行成功后进行的操作
    if (
      name === 'addPageAction' ||
      name === 'editPageAction' ||
      name === 'deletePageAction'
    ) {
      currentPage.value = 1
    }
  })
})
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 分页相关数据
const currentPage = ref(1) // 当前页数
const pageSize = ref(10) // 每页条目数

// 对网络请求进行封装
const postPageListData = (formData: any = {}) => {
  if (!isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  const queryData = { size, offset, ...formData }
  systemStore.fetchPageListAction(props.contentConfig.pageName, queryData)
}

// 分页逻辑
// 进入到该页面时，先进行一次网络请求，展示默认数据
postPageListData()
// pageSize发生改变时触发，重新发送网络请求
const handleSizeChange = () => {
  postPageListData()
}
// currentPage发生改变时触发，重新发送网络请求
const handleCurrentChange = () => {
  postPageListData()
}

// 删除/新增/修改
const onDeleteClick = (id: number) => {
  systemStore.deletePageAction(props.contentConfig.pageName, id)
}
const onAddClick = () => {
  emit('add-click')
}
const onEditClick = (itemData: any) => {
  emit('edit-click', itemData)
}

// 将子组件的方法暴露给父组件
defineExpose({
  postPageListData
})
</script>

<style scoped lang="less">
.page-content {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      font-size: 22px;
    }
  }
  .content {
    margin-top: 20px;
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
