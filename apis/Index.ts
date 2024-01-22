/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import axios from 'axios'
import {getCookie} from 'cookies-next'

import {BASE_URL, PROJECT_ID, USER_TOKEN} from '../utils/AppConfig'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    projectID: PROJECT_ID,
  },
})

instance.interceptors.request.use(
  (config: any) => {
    if (
      config?.url === '/linkedin/post' ||
      config?.url === '/linkedin/channel'
    ) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
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
