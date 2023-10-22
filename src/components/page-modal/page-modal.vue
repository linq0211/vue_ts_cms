<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isAddRef ? modalConfig.header.newHeader : modalConfig.header.editHeader
      "
      width="30%"
      center
    >
      <el-form :model="dialogForm" label-width="80px" size="large">
        <template v-for="item in modalConfig.formItem" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/store/main/system/system'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newHeader: string
      editHeader: string
    }
    formItem: any[]
  }
  otherInfo?: any
}

// 接收父组件传递参数
const props = defineProps<IProps>()

// 定义内容
const dialogVisible = ref(false)

const initialForm: any = {}
for (const item of props.modalConfig.formItem) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const dialogForm = reactive<any>(initialForm)

const systemStore = useSystemStore()
// 在外层判断当前是新建还是修改状态
const isAddRef = ref(true)
// 在外层保存进行修改的原对象
const editData = ref()

// 设置对话框的状态
const setDialogVisible = (isAdd: boolean, itemData?: any) => {
  dialogVisible.value = true

  // 将传入的判断当前表格状态保存到外层
  isAddRef.value = isAdd

  if (!isAdd && itemData) {
    // 修改
    // 默认展示对话框中内容
    for (const key in dialogForm) {
      dialogForm[key] = itemData[key]
    }
    // 将修改后的对象保存到外层
    editData.value = itemData
  } else {
    // 增加
    // 因为修改后会对原内容有保存，新增时需要先进行清空
    // 初始化值需要在对话框弹出之后在进行设置
    for (const key in dialogForm) {
      // 在formItem中找到和当前key对应的prop
      const item = props.modalConfig.formItem.find((item) => item.prop === key)

      // 进行初始化赋值
      dialogForm[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 确定按钮的点击
const onConfirmClick = () => {
  dialogVisible.value = false
  let infoData = dialogForm
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isAddRef.value && editData.value) {
    // 编辑
    systemStore.editPageAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 增加
    systemStore.addPageAction(props.modalConfig.pageName, infoData)
  }
}

// 将子组件方法暴露给父组件
defineExpose({
  setDialogVisible
})
</script>

<style scoped>
.el-form {
  padding: 0 20px;
  :deep(.el-tree) {
    margin-left: -30px;
  }
}
</style>
