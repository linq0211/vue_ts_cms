import myRequest from '@/service'

export function getAnalysisListData() {
  return myRequest.get({
    url: '/goods/amount/list'
  })
}

export function getCategoryCount() {
  return myRequest.get({
    url: '/goods/category/count'
  })
}

export function getCategorySale() {
  return myRequest.get({
    url: '/goods/category/sale'
  })
}

export function getCategoryFavor() {
  return myRequest.get({
    url: '/goods/category/favor'
  })
}

export function getSaleTop() {
  return myRequest.get({
    url: '/goods/sale/top10'
  })
}

export function getAddressSale() {
  return myRequest.get({
    url: '/goods/address/sale'
  })
}
