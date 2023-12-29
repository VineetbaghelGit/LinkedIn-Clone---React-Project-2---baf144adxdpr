/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
import {apiEndpoints} from '../utils/apis/apis'

import api from './Index'

// Define the structure of an API Call
interface ApiCall {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  data?: any
  params?: any
  id?: number | string
}
// Generic CRUD Function
const genericApiCall = async ({
  method,
  endpoint,
  data,
  params,
  id,
}: ApiCall): Promise<unknown> => {
  const url = id != null ? `${endpoint}${id}` : endpoint
  return await new Promise((resolve, reject) => {
    ;(api as any)
      [method.toLowerCase()](url, data, {params})
      .then((response: any) => {
        resolve(response.data)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

// Define individual calls using the new structure
const ApiUtils = {
  authLogin: async (params: any) =>
    await genericApiCall({
      method: 'POST',
      endpoint: apiEndpoints.LOGIN,
      data: params,
    }),
  authSignup: async (params: any) =>
    await genericApiCall({
      method: 'POST',
      endpoint: apiEndpoints.SIGNUP,
      data: params,
    }),
}

export default ApiUtils
