import loginSlice from './slices/auth/reducer'
import {type Action, configureStore, type ThunkAction} from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    Login: loginSlice,
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
