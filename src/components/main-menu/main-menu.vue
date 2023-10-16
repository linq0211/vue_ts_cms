<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" />
      <span v-show="!isFold" class="text">后台管理系统</span>
    </div>
    <div class="menu">
      <el-menu
        default-active="39"
        text-color="#b7bdc3"
        :collapse="isFold"
        active-text-color="#fff"
        background-color="#0b1a28"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.slice(8)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #0b1a28;
  .logo {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
    }
    .text {
      margin-left: 5px;
      color: #fff;
      white-space: nowrap;
    }
  }
  .menu {
    .el-menu {
      border-right: none;
      // 不能选择文本
      user-select: none;
    }
    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px;
        background-color: #0f2132;
      }
      .el-menu-item:hover {
        color: #fff;
      }
      // is-active选中的内置定义类
      .el-menu-item.is-active {
        background-color: #0a60bd;
      }
    }
  }
}
</style>
