/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import axios from 'axios'
import {getCookie} from 'cookies-next'

import {BASE_URL, USER_TOKEN} from '../utils/AppConfig'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config: any) => {
    const userTokenCookie =
      (getCookie(USER_TOKEN) ?? '') !== ''
        ? JSON.parse(getCookie(USER_TOKEN) as string)
        : ''
    if (userTokenCookie !== null) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userTokenCookie}`,
      }
    }

    return config
  },
  async (error: any) => {
    return await Promise.reject(error)
  },
)

// Add a response interceptor
instance.interceptors.response.use(
  (response: any) => {
    return response
  },
  async (error: any) => {
    return await Promise.reject(error)
  },
)
export default instance
