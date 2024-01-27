import {USER_ID} from '@/components/utils/AppConfig'
import {createSlice} from '@reduxjs/toolkit'

import {getCookie} from 'cookies-next'
const loggedInUserId = getCookie(USER_ID)
let userId = null
if (loggedInUserId != null) {
  userId = JSON.stringify(loggedInUserId)
}
export const initialState = {
  userId,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUserId(state, action) {
      state.userId = action.payload
    },
  },
})

export const {setLoggedInUserId} = userSlice.actions

export default userSlice.reducer
