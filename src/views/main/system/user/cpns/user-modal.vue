<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isAddRef ? '新建用户' : '修改用户'"
      width="30%"
      center
    >
      <el-form :model="dialogForm" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dialogForm.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="dialogForm.realname"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item v-if="isAddRef" label="密码" prop="password">
          <el-input
            v-model="dialogForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input
            v-model="dialogForm.cellphone"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="dialogForm.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <template v-for="item in roleList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            v-model="dialogForm.departmentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in departmentList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

// 定义内容
const dialogVisible = ref(false)
const dialogForm = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const systemStore = useSystemStore()
const { roleList, departmentList } = storeToRefs(systemStore)
// 在外层判断当前是新建还是修改状态
const isAddRef = ref(true)
// 在外层保存进行修改的原对象
const editData = ref()

// 设置对话框的状态
const setDialogVisible = (isAdd: boolean, itemData?: any) => {
  dialogVisible.value = true

  // 将传入的判断当前表格状态保存到外层
  isAddRef.value = isAdd

  if (!isAdd && itemData) {
    // 修改
    // 默认展示对话框中内容
    for (const key in dialogForm) {
      dialogForm[key] = itemData[key]
    }
    // 将修改后的对象保存到外层
    editData.value = itemData
  } else {
    // 增加
    // 因为修改后会对原内容有保存，新增时需要先进行清空
    for (const key in dialogForm) {
      dialogForm[key] = ''
    }
    editData.value = null
  }
}

// 确定按钮的点击
const onConfirmClick = () => {
  dialogVisible.value = false
  if (!isAddRef.value && editData.value) {
    // 编辑
    systemStore.editUserAction(editData.value.id, dialogForm)
  } else {
    // 增加
    systemStore.addUserAction(dialogForm)
  }
}

// 将子组件方法暴露给父组件
defineExpose({
  setDialogVisible
})
</script>

<style scoped>
.el-form {
  padding: 0 20px;
}
</style>
