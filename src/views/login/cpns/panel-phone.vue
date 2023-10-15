<template>
  <div class="panel-phone">
    <el-form
      label-width="80px"
      size="large"
      :rules="phoneRules"
      :model="phoneForm"
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phoneForm.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <div class="verify">
          <el-input v-model="phoneForm.verify" />
          <el-button class="btn" type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'
const phoneForm = reactive({
  number: '',
  verify: ''
})
const phoneRules: FormRules = {
  number: [
    { required: true, message: '必须填写手机号', trigger: 'blur' },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '输入的手机号格式不正确',
      trigger: 'blur'
    }
  ],
  verify: [{ required: true, message: '必须填写验证码', trigger: 'blur' }]
}
</script>

<style scoped lang="less">
.verify {
  display: flex;
  .btn {
    margin-left: 8px;
  }
}
</style>
