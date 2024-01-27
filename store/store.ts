import loginSlice from './slices/auth/reducer'
import userSlice from './slices/user/reducer'
import {type Action, configureStore, type ThunkAction} from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    Login: loginSlice,
    User: userSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
