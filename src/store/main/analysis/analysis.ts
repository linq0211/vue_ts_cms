import {
  getAnalysisListData,
  getCategoryCount,
  getCategorySale,
  getCategoryFavor,
  getSaleTop,
  getAddressSale
} from '@/service/main/analysis/analysis'
import type { IAnalysis } from '@/types'
import { defineStore } from 'pinia'

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysis => ({
    amountList: [],
    categoryCount: [],
    categorySale: [],
    categoryFavor: [],
    saleTop: [],
    addressSale: []
  }),
  actions: {
    async fetchAmountListAction() {
      const amountListResult = await getAnalysisListData()
      const categoryCountResult = await getCategoryCount()
      const categorySaleResult = await getCategorySale()
      const categoryFavorResult = await getCategoryFavor()
      const saleTopResult = await getSaleTop()
      const addressSaleResult = await getAddressSale()
      this.amountList = amountListResult.data
      this.categoryCount = categoryCountResult.data
      this.categorySale = categorySaleResult.data
      this.categoryFavor = categoryFavorResult.data
      this.saleTop = saleTopResult.data
      this.addressSale = addressSaleResult.data
    }
  }
})

export default useAnalysisStore
