<template>
  <div class="page-search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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

// 向父组件发送事件
const emit = defineEmits(['reset-click', 'query-click'])

// 定义表单相关内容
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

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
