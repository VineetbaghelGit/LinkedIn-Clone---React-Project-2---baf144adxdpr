/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
    const excludedEndpoints = '/linkedin/post'
    const configURL = config.url
    if (!configURL.includes(excludedEndpoints)) {
      if (typeof window !== 'undefined') {
        const loader: HTMLElement | null = document.getElementById('cover-spin')
        if (loader !== null) {
          loader.style.display = 'block'
        }
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
    if (typeof window !== 'undefined') {
      const loader: HTMLElement | null = document.getElementById('cover-spin')
      if (loader !== null) {
        loader.style.display = 'none'
      }
    }
    return response
  },
  async (error: any) => {
    if (typeof window !== 'undefined') {
      const loader: HTMLElement | null = document.getElementById('cover-spin')
      if (loader !== null) {
        loader.style.display = 'none'
      }
    }
    return await Promise.reject(error)
  },
)
export default instance
