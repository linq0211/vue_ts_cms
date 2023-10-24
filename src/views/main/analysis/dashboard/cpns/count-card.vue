<template>
  <div class="chart-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="number1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="number2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount: string
  title: string
  tips: string
  subtitle: string
  number1: number
  number2: number
}

const props = withDefaults(defineProps<IProps>(), {
  amount: '默认amount',
  title: '默认title',
  tips: '默认tips',
  subtitle: '默认subtitle',
  number1: 0,
  number2: 0
})

const number1Ref = ref<HTMLElement>()
const number2Ref = ref<HTMLElement>()

const countUpOptions = {
  // 前缀
  prefix: props.amount === 'saleroom' ? '￥' : ''
}

// 获取dom需要在元素进行挂载后使用
onMounted(() => {
  // CountUp为一个类，需要通过创建实例进行使用
  // 参数一：绑定的元素, 参数二：结束值, 参数三?：配置对象
  const countup1 = new CountUp(number1Ref.value!, props.number1, countUpOptions)
  const countup2 = new CountUp(number2Ref.value!, props.number1, countUpOptions)

  countup1.start()
  countup2.start()
})
</script>

<style scoped lang="less">
.chart-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 130px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: rgba(0, 0, 0, 0.45);
    height: 38px;
    font-size: 14px;
  }
  .content {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    border-top: 1px solid #f0f0f0;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
