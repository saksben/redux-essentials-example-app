import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from '../features/notifications/notificationsSlice'
import { apiSlice } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// state object "store" > reducer > state field "posts" data updated ({name} in slice) -> reducer function "postsReducer" used when actions dispatched
