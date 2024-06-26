import { AxiosHttpClientAdapter } from '../axios/AxiosHttpClientAdapter'
import { makeScriptRunnerBaseUrl } from './make-script-runner-base-url'
import * as Errors from '@/services/axios/errors'

export const loadScriptRunnerExecutionResultsService = async (executionId) => {
  let httpResponse = await AxiosHttpClientAdapter.request({
    url: `${makeScriptRunnerBaseUrl()}/executions/${executionId}/results`,
    method: 'GET'
  })
  return parseHttpResponse(httpResponse)
}

const adapt = (httpResponse) => {
  const { result } = httpResponse.body

  return {
    result: {
      domain: {
        id: result.domain.id,
        url: `https://${result.domain.url}`
      },
      edgeApplication: {
        id: result.edge_application.id,
        name: result.edge_application.name
      },
      extras: result.extras
    }
  }
}

const parseHttpResponse = (httpResponse) => {
  switch (httpResponse.statusCode) {
    case 200: {
      const hasErrors = httpResponse.body.result.errors || httpResponse.body.result.error
      if (hasErrors) {
        throw new Error(httpResponse.body.result.message).message
      }
      return adapt(httpResponse)
    }
    case 400:
      throw new Errors.NotFoundError().message
    case 401:
      throw new Errors.InvalidApiTokenError().message
    case 403:
      throw new Errors.PermissionError().message
    case 404:
      throw new Errors.NotFoundError().message
    case 500:
      throw new Errors.InternalServerError().message
    default:
      throw new Errors.UnexpectedError().message
  }
}
