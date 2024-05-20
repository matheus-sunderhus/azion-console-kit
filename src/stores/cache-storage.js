import { defineStore } from 'pinia'
import { EXPIRY_DURATION } from '@/utils/constants'

// Utility function to handle localStorage operations
const nameStorage = (nameCacheData) => `chached-data-${nameCacheData}`

const getLocalStorageItem = (nameCacheData) => {
  const chachedData = localStorage.getItem(nameStorage(nameCacheData))

  return chachedData ? JSON.parse(chachedData) : null
}

const setLocalStorageItem = (nameCacheData, value) => {
  const newCachedData = JSON.stringify(value)
  localStorage.setItem(nameStorage(nameCacheData), newCachedData)
}

export const useCacheStore = defineStore({
  id: 'cacheStore',
  state: () => ({
    cachedData: {}
  }),
  actions: {
    setCacheData(nameCacheData, data) {
      if (!data || data.length === 0) return

      const now = Date.now()
      this.cachedData[nameCacheData] = data

      const newCachedData = { createdCachedDataTimestamp: now, data }
      setLocalStorageItem(nameCacheData, newCachedData)
    },
    checkAndFetchDataIfExpired(nameCacheData) {
      const cached = getLocalStorageItem(nameCacheData)
      if (cached) {
        const { createdCachedDataTimestamp, data } = cached
        const now = Date.now()

        if (now - createdCachedDataTimestamp < EXPIRY_DURATION) {
          // Data is not expired, update the cache
          this.setCacheData(nameCacheData, data)
          return true
        }
      }
      // return false and fetch new data externally
      return false
    }
  }
})
