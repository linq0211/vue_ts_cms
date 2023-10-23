<template>
  <div class="page-search" v-if="isQuery">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="refresh" @click="onResetClick">重置</el-button>
      <el-button icon="search" type="primary" @click="onQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import usePermission from '@/hooks/usePermission'

interface IProps {
  searchConfig: {
    pageName: string
    formItem: any[]
  }
}

// 向父组件发送事件/接收父组件传递参数
const emit = defineEmits(['reset-click', 'query-click'])
const props = defineProps<IProps>()

// 获取按钮权限
const isQuery = usePermission(`${props.searchConfig.pageName}:query`)

// 定义表单相关内容
const initialForm: any = {}
for (const item of props.searchConfig.formItem) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置表单内容
const formRef = ref<InstanceType<typeof ElForm>>()
const onResetClick = () => {
  // 将表单内容(searchForm)重置为空
  formRef.value?.resetFields()

  // 向父组件发送重置事件
  emit('reset-click')
}
// 查询
const onQueryClick = () => {
  // 向父组件发送查询事件，并且携带上表单中的内容
  emit('query-click', searchForm)
}
</script>

<style scoped lang="less">
.page-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btn {
    text-align: right;
    .el-button {
      height: 36px;
    }
  }
}
</style>
