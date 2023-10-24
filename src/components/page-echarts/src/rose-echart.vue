<template>
  <div class="rose">
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
  roseData: IEchartValueType[]
}
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      formatter: function (params: any) {
        return `${params.name.slice(0, 7)}...` + ' : ' + params.value
      }
    },
    legend: {
      left: 0,
      orient: 'vertical',
      textStyle: {
        width: 80,
        overflow: 'truncate',
        ellipsis: '...'
      }
    },
    series: [
      {
        type: 'pie',
        // 内半径/外半径的大小
        radius: [10, 130],
        // 设置区域的位置
        center: ['65%', '50%'],
        bottom: '-15%',
        roseType: 'area', // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 4
        },
        data: props.roseData,
        label: {
          // 取消标签展示
          show: false
        }
      }
    ]
  }
})
</script>

<style scoped></style>
