<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadCrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToCrumb } from '@/utils/map-menus'
import useLoginStore from '@/store/login/login'

const route = useRoute()
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu
const breadCrumb = computed(() => {
  return mapPathToCrumb(route.path, userMenu)
})
</script>

<style scoped></style>
