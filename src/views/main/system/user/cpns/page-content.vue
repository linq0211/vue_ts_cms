<template>
  <div class="page-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="onAddClick">
        新建用户
      </el-button>
    </div>
    <div class="content">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="enable"
          label="状态"
          width="100px"
        >
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatDate(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatDate(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
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
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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

// 向父组件发送事件
const emit = defineEmits(['add-click', 'edit-click'])

// 获取按钮权限
const isCreate = usePermission(`users:create`)
const isDelete = usePermission(`users:delete`)
const isUpdate = usePermission(`users:update`)
const isQuery = usePermission(`users:query`)

// 获取store中的数据
const systemStore = useSystemStore()
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
  systemStore.fetchPageListAction('users', queryData)
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
  systemStore.deletePageAction('users', id)
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
