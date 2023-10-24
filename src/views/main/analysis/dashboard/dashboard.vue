<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="分类商品数量(饼图)">
          <pie-echart :pie-data="pieData" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="不同城市商品销量(地图)">
          <map-echart :map-data="mapData" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card header="销量前10商品数量(玫瑰图)">
          <rose-echart :rose-data="roseData" />
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card header="分类商品销量(折线图)">
          <line-echart :labels="lineData.labels" :values="lineData.values" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类商品收藏(柱状图)">
          <bar-echart :labels="barData.labels" :values="barData.values" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/main/analysis/analysis'
import countCard from './cpns/count-card.vue'
import chartCard from './cpns/chart-card.vue'
import {
  pieEchart,
  roseEchart,
  barEchart,
  lineEchart,
  mapEchart
} from '@/components/page-echarts'

// 获取商品数据统计
const analysisStore = useAnalysisStore()
const {
  amountList,
  categoryCount,
  categoryFavor,
  categorySale,
  saleTop,
  addressSale
} = storeToRefs(analysisStore)
analysisStore.fetchAmountListAction()

// 传递给echart组件格式化后数据，通过computed进行响应式绑定
// 饼图
const pieData = computed(() => {
  return categoryCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
// 玫瑰图
const roseData = computed(() => {
  return saleTop.value.map((item) => {
    return { name: item.name, value: item.saleCount }
  })
})
// 柱状图
const barData = computed(() => {
  const labels = categoryFavor.value.map((item) => item.name)
  const values = categoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
// 折线图
const lineData = computed(() => {
  const labels = categorySale.value.map((item) => item.name)
  const values = categorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
// 地图
const mapData = computed(() => {
  return addressSale.value.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.dashboard {
  .el-row {
    margin-bottom: 10px;
  }
  .echarts {
    height: 300px;
  }
}
</style>
