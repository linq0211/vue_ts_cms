import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'department',
  header: {
    newHeader: '新建部门',
    editHeader: '修改部门'
  },
  formItem: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}
export default modalConfig
