import { AxiosHttpClientAdapter } from '@/services/axios/AxiosHttpClientAdapter'
import { useCacheStore } from '@/stores/cache-storage'

import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

const mockAxios = {
  request: async () => {
    return Promise.resolve({
      data: { message: 'Success' },
      status: 200
    })
  },
  cachedData: {
    body: { message: 'Success cachedData' },
    statusCode: 200
  }
}

const makeSut = () => {
  const sut = AxiosHttpClientAdapter

  return {
    sut,
    mockAxios
  }
}

let store

describe('AxiosHttpClientAdapter', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    store = useCacheStore()
  })
  it('should make a successful request', async () => {
    const { sut, mockAxios } = makeSut()
    const response = await sut.request(
      {
        url: 'https://example.com/api/resource',
        method: 'GET',
        headers: { Authorization: 'Bearer token' }
      },
      mockAxios
    )

    expect(response).toEqual({
      body: { message: 'Success' },
      statusCode: 200
    })
  })

  it('should handle an error and return an adapted response', async () => {
    const mockError = {
      response: {
        data: { error: 'Not Found' },
        status: 404
      }
    }
    const { sut, mockAxios } = makeSut()
    mockAxios.request = async () => {
      throw mockError
    }

    const response = await sut.request(
      {
        url: 'https://example.com/api/resource',
        method: 'GET'
      },
      mockAxios
    )

    expect(response).toStrictEqual({
      body: mockError.response.data,
      statusCode: mockError.response.status
    })
  })

  it('should return the cachedData', async () => {
    const { sut, mockAxios } = makeSut()

    store.setCacheData('test', mockAxios.cachedData)

    const response = await sut.request(
      {
        url: 'https://example.com/api/resource',
        method: 'GET',
        headers: { Authorization: 'Bearer token' },
        nameCacheData: 'test'
      },
      mockAxios
    )

    expect(response).toEqual({
      body: { message: 'Success cachedData' },
      statusCode: 200
    })
  })
})
