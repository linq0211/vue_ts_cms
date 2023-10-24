<template>
  <div class="bar">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

// 获取prop
interface IProps {
  labels: string[]
  values: string[]
}
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    grid: {
      top: '5%',
      left: '0%',
      right: '-5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      data: props.labels,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      z: 10
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ]
          }
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ]
            }
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
