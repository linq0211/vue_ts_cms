<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间tabs标签 -->
    <div class="tabs">
      <el-tabs v-model="tabActive" type="border-card" stretch>
        <el-tab-pane name="account">
          <!-- tab的 label 标题插槽 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>

          <!-- tab的具体内容 -->
          <panel-account ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <!-- tab的 label 标题插槽 -->
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>

          <!-- tab的具体内容 -->
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部信息 -->
    <div class="pwd">
      <el-checkbox v-model="rememberPwd" label="记住密码" size="large" />
      <el-link href="" :underline="false">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="onLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import panelAccount from './panel-account.vue'
import panelPhone from './panel-phone.vue'

// 记住密码
const rememberPwd = ref(false)

// tabs标签
const tabActive = ref('account')

// 获取子组件panelAccount实例
// const accountRef = ref<any>() 没有类型检测和代码提示，可以但不推荐
// const accountRef = ref<panelAccount>() 组件是一个对象，导出内容本质上是一个类，一个构造器
/**
 * typeof panelAccount：panelAccount组件的类型
 * InstanceType<T>：内置工具类型，用于获取构造函数类型的实例类型
 * InstanceType<typeof panelAccount>：panelAccount组件的实例类型
 */
const accountRef = ref<InstanceType<typeof panelAccount>>()

// 立即登录按钮点击
const onLoginBtnClick = () => {
  if (tabActive.value === 'account') {
    // console.log('登录方式为账号登录')
    // 调用实例方法
    accountRef.value?.loginAction()
  } else {
    // console.log('登录方式为手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .tabs {
    .label {
      display: flex;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }

  .pwd {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    // --el-button-size: 50px !important;
  }
}
</style>
