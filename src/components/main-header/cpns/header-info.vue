<template>
  <div class="header-info">
    <div class="icons">
      <span class="icon">
        <el-icon><Bell /></el-icon>
      </span>
      <span class="icon">
        <el-icon><Message /></el-icon>
      </span>
      <span class="icon">
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="message">
          <el-avatar
            :size="20"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache(TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;

  .icons {
    display: flex;
    margin-right: 20px;
    .icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      cursor: pointer;
      .dot {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 6px;
        height: 6px;
        z-index: 9;
        background-color: red;
        border-radius: 100%;
      }
    }
  }
  .info {
    .message {
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        margin-left: 5px;
      }
    }
  }
  .info {
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
    :deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;
    }
  }
}
</style>
