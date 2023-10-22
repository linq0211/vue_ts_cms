import { ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'

type callbackType = (itemData?: any) => void

function usePageModal(addCB?: callbackType, editCB?: callbackType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()

  // 对content组件传来的事件进行响应
  const onAddClick = () => {
    modalRef.value?.setDialogVisible(true)
    if (addCB) addCB()
  }
  const onEditClick = (itemData: any) => {
    modalRef.value?.setDialogVisible(false, itemData)
    if (editCB) editCB(itemData)
  }

  return { modalRef, onAddClick, onEditClick }
}

export default usePageModal
