import { createSlice } from '@reduxjs/toolkit'

// Initial posts array
const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

// Slice of Redux state reducer logic/data/actions pertaining to posts. Automatically generates action creators and action types corresponding to reducers and state.
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // createSlice auto generates an action creator function with the same name. I.e. type: {name}/{action}
    postAdded(state, action) {
      state.push(action.payload)
    },
  },
})

// Action to use in UI components to dispatch an action when user clicks "Save Post"
export const { postAdded } = postsSlice.actions

// The posts reducer function that createSlice generated
export default postsSlice.reducer

// actions dispatched -> slice of Redux logic/actions > reducers = postsSlice.actions > destructured action creator "postAdded" -> use action creator in UI to be dispatched
// -> export function of reduced slice to store (postsSlice.reducer)