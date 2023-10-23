const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  formItem: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },

    {
      type: 'custom',
      label: '商品名称',
      prop: 'name',
      width: '100px',
      slotName: 'name'
    },
    { type: 'default', label: '原价格', prop: 'oldPrice', width: '80px' },
    { type: 'default', label: '新价格', prop: 'newPrice', width: '80px' },
    {
      type: 'custom',
      label: '商品描述',
      prop: 'desc',
      width: '100px',
      slotName: 'desc'
    },
    { type: 'default', label: '状态', prop: 'status', width: '80px' },
    {
      type: 'custom',
      label: '图片',
      prop: 'imgUrl',
      width: '80px',
      slotName: 'img'
    },
    { type: 'default', label: '库存', prop: 'inventoryCount', width: '80px' },
    { type: 'default', label: '销量', prop: 'saleCount', width: '80px' },
    { type: 'default', label: '收藏', prop: 'favorCount', width: '80px' },
    { type: 'default', label: '地址', prop: 'address', width: '80px' },

    { type: 'time', label: '创建时间', prop: 'createAt', width: '200px' },
    { type: 'time', label: '更新时间', prop: 'updateAt', width: '200px' },

    { type: 'handler', label: '操作', width: '150px' }
  ]
}
export default contentConfig
