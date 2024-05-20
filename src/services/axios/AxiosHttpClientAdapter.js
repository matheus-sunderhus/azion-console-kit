import defaultApi from './makeApi'
import { useCacheStore } from '@/stores/cache-storage'

import {
  InternalServerError,
  InvalidApiRequestError,
  InvalidApiTokenError,
  NotFoundError,
  PermissionError,
  UnexpectedError
} from './errors'

export const parseHttpResponse = (httpResponse) => {
  switch (httpResponse.statusCode) {
    case 200:
      return httpResponse?.body || null
    case 201:
      return 'Resource successfully created'
    case 202:
      return 'Resource successfully updated'
    case 204:
      return 'Resource successfully deleted'
    case 400:
      throw new InvalidApiRequestError().message
    case 401:
      throw new InvalidApiTokenError().message
    case 403:
      throw new PermissionError().message
    case 404:
      throw new NotFoundError().message
    case 500:
      throw new InternalServerError().message
    default:
      throw new UnexpectedError().message
  }
}

export class AxiosHttpClientAdapter {
  static async request(
    { url, method, headers, body, signal, nameCacheData },
    axios = defaultApi(import.meta.env.VITE_PERSONAL_TOKEN)
  ) {
    let axiosResponse

    const chacheStore = useCacheStore()

    if (nameCacheData) {
      if (chacheStore.checkAndFetchDataIfExpired(nameCacheData)) {
        const cacheData = chacheStore.cachedData

        return cacheData[nameCacheData]
      }
    }

    try {
      axiosResponse = await axios.request({
        url: url,
        method: method,
        headers: headers,
        data: body,
        signal
      })
    } catch (error) {
      const axiosError = error
      axiosResponse = axiosError.response
    }

    if (nameCacheData) {
      chacheStore.setCacheData(nameCacheData, AxiosHttpClientAdapter.adapt(axiosResponse))
    }

    return AxiosHttpClientAdapter.adapt(axiosResponse)
  }

  static adapt(axiosResponse) {
    return {
      body: axiosResponse.data,
      statusCode: axiosResponse.status
    }
  }
}
