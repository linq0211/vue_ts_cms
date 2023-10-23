const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  formItem: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },

    { type: 'default', label: '角色名称', prop: 'name', width: '170px' },
    { type: 'default', label: '角色权限', prop: 'intro' },

    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '150px' }
  ]
}
export default contentConfig
