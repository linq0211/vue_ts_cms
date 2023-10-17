<template>
  <div class="panel-account">
    <el-form
      :model="accountForm"
      label-width="60px"
      :rules="accountRules"
      size="large"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const ACCOUNT_NAME = 'name'
const ACCOUNT_PASSWORD = 'password'

// 绑定表单及数据
const accountForm = reactive<IAccount>({
  name: localCache.getCache(ACCOUNT_NAME) ?? '',
  password: localCache.getCache(ACCOUNT_PASSWORD) ?? ''
})

// 定义账号校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入用户名', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]{6,}$/,
      message: '用户名必须是6位以上数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      min: 3,
      message: '密码必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (rememberPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = accountForm.name
      const password = accountForm.password

      loginStore.loginAccountAction({ name, password }).then(() => {
        if (rememberPwd) {
          localCache.setCache(ACCOUNT_NAME, name)
          localCache.setCache(ACCOUNT_PASSWORD, password)
        } else {
          localCache.removeCache(ACCOUNT_NAME)
          localCache.removeCache(ACCOUNT_PASSWORD)
        }
      })
    } else {
      ElMessage.error('你输入的用户名或密码格式不正确')
    }
  })
}
// 将子组件的属性方法暴露给父组件
defineExpose({
  loginAction
})
</script>

<style scoped></style>
