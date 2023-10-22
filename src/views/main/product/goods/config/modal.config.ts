import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'goods',
  header: {
    newHeader: '新建商品',
    editHeader: '修改商品'
  },
  formItem: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      placeholder: '请输入原价格'
    },
    {
      type: 'input',
      label: '现价格',
      prop: 'newPrice',
      placeholder: '请输入现价格'
    },
    {
      type: 'input',
      label: '商品描述',
      prop: 'desc',
      placeholder: '请输入商品描述'
    },
    {
      type: 'select',
      label: '状态',
      prop: 'status',
      placeholder: '请输入类别名称',
      options: []
    },
    {
      type: 'input',
      label: '图片',
      prop: 'imgUrl',
      placeholder: '请选中图片',
      slotName: 'img'
    },
    {
      type: 'input',
      label: '库存',
      prop: 'inventoryCount',
      placeholder: '请输入商品库存'
    },
    {
      type: 'input',
      label: '销量',
      prop: 'saleCount',
      placeholder: '请输入销售数量'
    },
    {
      type: 'input',
      label: '收藏',
      prop: 'favorCount',
      placeholder: '请输入收藏数量'
    },
    {
      type: 'input',
      label: '地址',
      prop: 'address',
      placeholder: '请输入商品地址'
    }
  ]
}
export default modalConfig
