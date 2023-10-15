enum cacheType {
  LOCAL,
  SESSION
}

class Cache {
  storage: Storage
  constructor(type: cacheType) {
    this.storage = type === cacheType.LOCAL ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    } else {
      throw new Error('没有传入value或传入value为空')
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  clearCache() {
    this.storage.clear()
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }
}
const localCache = new Cache(cacheType.LOCAL)
const sessionCache = new Cache(cacheType.SESSION)

export { localCache, sessionCache }
