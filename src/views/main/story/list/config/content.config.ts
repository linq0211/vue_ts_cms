const contentConfig = {
  pageName: 'story',
  header: {
    title: '故事列表'
  },
  formItem: [
    { type: 'index', label: '序号', width: '100px' },

    { type: 'default', label: '故事标题', prop: 'title', width: '200px' },
    {
      type: 'default',
      label: '我的故事',
      prop: 'content',
      slotName: 'content'
    },

    { type: 'time', label: '创建时间', prop: 'createAt', width: '300px' }
  ]
}
export default contentConfig
