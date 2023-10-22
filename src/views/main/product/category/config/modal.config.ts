import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'category',
  header: {
    newHeader: '新建类别',
    editHeader: '修改类别'
  },
  formItem: [
    {
      type: 'input',
      label: '类别名称',
      prop: 'name',
      placeholder: '请输入类别名称'
    }
  ]
}
export default modalConfig
