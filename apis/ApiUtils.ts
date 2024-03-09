/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
import {apiEndpoints} from '../utils/apis/apis'

import api from './Index'

// Define the structure of an API Call
interface ApiCall {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
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
  updatePassword: async (params: any) =>
    await genericApiCall({
      method: 'PATCH',
      endpoint: apiEndpoints.UPDATE_PASSWORD,
      data: params,
    }),
  createPost: async (params: any) =>
    await genericApiCall({
      method: 'POST',
      endpoint: apiEndpoints.LINKEDIN_POST,
      data: params,
    }),
  getPosts: async (params: string) =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_POST}${params}`,
    }),
  deletePost: async (params: string) =>
    await genericApiCall({
      method: 'DELETE',
      endpoint: `${apiEndpoints.LINKEDIN_POST}${params}`,
    }),
  postById: async (params: string) =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_POST}${params}`,
    }),
  createGroup: async (params: any) =>
    await genericApiCall({
      method: 'POST',
      endpoint: apiEndpoints.LINKEDIN_CHANNEL,
      data: params,
    }),
  getGroupsList: async () =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_CHANNEL}`,
    }),
  deleteGroup: async (params: string) =>
    await genericApiCall({
      method: 'DELETE',
      endpoint: `${apiEndpoints.LINKEDIN_CHANNEL}${params}`,
    }),
  upvotePost: async (params: string) =>
    await genericApiCall({
      method: 'POST',
      endpoint: `${apiEndpoints.LINKEDIN_LIKE}${params}`,
    }),
  getPostComments: async (params: string) =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_POST}${params}`,
    }),
  postComment: async (params: any, postId: string) =>
    await genericApiCall({
      method: 'POST',
      endpoint: `${apiEndpoints.LINKEDIN_COMMENT}/${postId}`,
      data: params,
    }),
  deleteComment: async (params: string) =>
    await genericApiCall({
      method: 'DELETE',
      endpoint: `${apiEndpoints.LINKEDIN_COMMENT}${params}`,
    }),
  updateComment: async (params: any, commentId: string) =>
    await genericApiCall({
      method: 'PATCH',
      endpoint: `${apiEndpoints.LINKEDIN_COMMENT}/${commentId}`,
      data: params,
    }),
  searchFilter: async (params: any) =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_POST}${params}`,
    }),
  getUserDetails: async (params: string) =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_USER}${params}`,
    }),
  followUser: async (params: string) =>
    await genericApiCall({
      method: 'POST',
      endpoint: `${apiEndpoints.LINKEDIN_FOLLOW}${params}`,
    }),
  unfollowUser: async (params: string) =>
    await genericApiCall({
      method: 'DELETE',
      endpoint: `${apiEndpoints.LINKEDIN_FOLLOW}${params}`,
    }),
  getPostDetails: async (params: string) =>
    await genericApiCall({
      method: 'GET',
      endpoint: `${apiEndpoints.LINKEDIN_POST}${params}`,
    }),
}

export default ApiUtils
