import { ref } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  // 对search组件传来的事件进行响应
  const onResetClick = () => {
    contentRef.value?.postPageListData()
  }
  const onQueryClick = (formData: any) => {
    contentRef.value?.postPageListData(formData)
  }

  return { contentRef, onQueryClick, onResetClick }
}

export default usePageContent
