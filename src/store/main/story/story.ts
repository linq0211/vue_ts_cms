import { defineStore } from 'pinia'
import type { IStory } from '@/types'
import { postPageList } from '@/service/main/system/system'

const useStoryStore = defineStore('story', {
  state: (): IStory => ({
    storyList: []
  }),
  actions: {
    async fetchStoryListAction() {
      const storyListResult = await postPageList('story')
      console.log(storyListResult)
    }
  }
})

export default useStoryStore
