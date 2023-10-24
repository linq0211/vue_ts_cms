<template>
  <div class="pie">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'

// 获取prop
interface IProps {
  pieData: IEchartValueType[]
}
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    // 提示框: 不设置属性，展示默认配置
    tooltip: {},
    // 图例: 不设置属性，展示默认配置
    legend: {},
    series: [
      {
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,

        // 高亮
        emphasis: {
          // 样式
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
