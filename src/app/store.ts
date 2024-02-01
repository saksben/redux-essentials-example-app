import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'
import { apiSlice } from '@/features/api/apiSlice'

import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware, apiSlice.middleware),
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
