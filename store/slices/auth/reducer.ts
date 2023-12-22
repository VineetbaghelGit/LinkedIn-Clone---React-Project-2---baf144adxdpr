import {createSlice} from '@reduxjs/toolkit'

import {USER_TOKEN} from '../../../utils/AppConfig'
import {getCookie} from 'cookies-next'
const userTokenCookie = getCookie(USER_TOKEN)
let authToken = null
if (userTokenCookie != null) {
  authToken = JSON.stringify(userTokenCookie)
}
export const initialState = {
  token: authToken,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginToken(state, action) {
      state.token = action.payload
    },
    removeLoginToken(state) {
      state.token = ''
    },
  },
})

export const {setLoginToken, removeLoginToken} = loginSlice.actions

export default loginSlice.reducer
