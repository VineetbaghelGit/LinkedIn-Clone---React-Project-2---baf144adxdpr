import {USER_DETAILS, USER_ID} from '@/components/utils/AppConfig'
import {createSlice} from '@reduxjs/toolkit'

import {getCookie} from 'cookies-next'
const loggedInUserId = getCookie(USER_ID)
const loggedInUserDetails = getCookie(USER_DETAILS)
let userId = null
if (loggedInUserId != null) {
  userId = JSON.parse(loggedInUserId)
}
let userDetails = null
if (loggedInUserDetails != null) {
  userDetails = JSON.parse(loggedInUserDetails)
}
export const initialState = {
  userId,
  userDetails,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUserId(state, action) {
      state.userId = action.payload
    },
    setLoggedInUserDetails(state, action) {
      state.userDetails = action.payload
    },
    removeLoggedInUserId(state) {
      state.userId = ''
    },
    removeLoggedInUserDetails(state) {
      state.userDetails = null
    },
  },
})

export const {
  setLoggedInUserId,
  setLoggedInUserDetails,
  removeLoggedInUserId,
  removeLoggedInUserDetails,
} = userSlice.actions

export default userSlice.reducer
