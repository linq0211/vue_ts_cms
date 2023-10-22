import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    newHeader: '新建角色',
    editHeader: '修改角色'
  },
  formItem: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '角色权限',
      prop: 'intro',
      placeholder: '请输入角色权限'
    },
    {
      type: 'custom',
      slotName: 'menulist'
    }
  ]
}
export default modalConfig
