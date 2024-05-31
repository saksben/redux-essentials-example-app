import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice' // Every time we create a new slice, we need to add its reducer function to the store
import usersReducer from "../features/users/usersSlice"

export const store = configureStore({
  reducer: {
    posts: postsReducer, // Tells Redux we want the state object to have a field name "posts", and all data will be updated by postsReducer when actions are dispatched
    users: usersReducer,
  },
})

// state object "store" > reducer > state field "posts" data updated ({name} in slice) -> reducer function "postsReducer" used when actions dispatched