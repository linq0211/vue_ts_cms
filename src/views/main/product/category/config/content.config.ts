const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建类别'
  },
  formItem: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },

    { type: 'default', label: '类别名称', prop: 'name', width: '150px' },

    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '150px' }
  ]
}
export default contentConfig
