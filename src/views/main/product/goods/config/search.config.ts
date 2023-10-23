const searchConfig = {
  pageName: 'goods',
  formItem: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入查询的商品名称'
    },
    {
      type: 'input',
      label: '商品地址',
      prop: 'address',
      placeholder: '请输入查询的商品地址'
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}

export default searchConfig
