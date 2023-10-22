import { ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof pageModal>>()

  // 对content组件传来的事件进行响应
  const onAddClick = () => {
    modalRef.value?.setDialogVisible(true)
  }
  const onEditClick = (itemData: any) => {
    modalRef.value?.setDialogVisible(false, itemData)
  }

  return { modalRef, onAddClick, onEditClick }
}

export default usePageModal
