<template>
  <div class="base-echart">
    <div class="echart" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import chinaJSON from '../data/china.json'

// 接收父组件传递参数
interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()

// echarts
echarts.registerMap('china', chinaJSON as any)
const echartsRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartsRef.value!, 'light', {
    renderer: 'canvas'
  })

  // 立即执行并获取依赖，依赖发生变化后重新执行
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  // 监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style scoped>
.echart {
  height: 300px;
}
</style>
