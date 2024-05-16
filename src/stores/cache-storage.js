import { defineStore } from 'pinia'
import { EXPIRY_DURATION } from '@/utils/constants'

// Utility function to handle localStorage operations
const nameStorage = (key) => `chached-data-${key}`

const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(nameStorage(key))

  return item ? JSON.parse(item) : null
}

const setLocalStorageItem = (key, value) => {
  const newValue = JSON.stringify(value)
  localStorage.setItem(nameStorage(key), newValue)
}

export const useCacheStore = defineStore({
  id: 'cacheStore',
  state: () => ({
    cachedData: {
      onboarding: {},
      browse: {},
      recommended: {},
      other: {}
    }
  }),
  actions: {
    cacheData(dataType, data) {
      if (!data || data.length === 0) return

      const now = Date.now()
      this.cachedData[dataType] = data

      const newCachedData = { createdCachedDataTimestamp: now, data }
      setLocalStorageItem(dataType, newCachedData)
    },
    checkAndFetchDataIfExpired(dataType) {
      const cached = getLocalStorageItem(dataType)
      if (cached) {
        const { createdCachedDataTimestamp, data } = cached
        const now = Date.now()

        if (now - createdCachedDataTimestamp < EXPIRY_DURATION) {
          // Data is not expired, update the cache
          this.cacheData(dataType, data)
          return true
        }
      }
      // return false and fetch new data externally
      return false
    }
  }
})
