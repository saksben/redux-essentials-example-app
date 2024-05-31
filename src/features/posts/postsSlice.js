import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

// Initial posts array
const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

// Slice of Redux state reducer logic/data/actions pertaining to posts. Automatically generates action creators and action types corresponding to reducers and state.
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  // createSlice auto generates an action creator function with the same name. I.e. type: {name}/{action}
  reducers: {
    // postAdded reducer action-creator
    postAdded: {
      // Pushes the new post data to state
      reducer(state, action) {
        state.push(action.payload)
      },
      // Use the prepare callback to customize the payload data (add the id)
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString,
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    // postUpdated reducer action-creator
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id) // See if there is any post in {state} that matches the {action} id
      // If a specific post already exists, update its title to {action.payload.title} and the content to {action.payload.content}
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    // reactionAdded reducer action-creator
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId) // See if there is any post in {state} that matches the {action} id
      // If a specific post already exists, increment its specified reaction's count
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

// Action to use in UI components to dispatch an action when user clicks the corresponding button
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// The posts reducer function that createSlice generated
export default postsSlice.reducer

// actions dispatched -> slice of Redux logic/actions > reducers = postsSlice.actions > destructured action creator "postAdded" -> use action creator in UI to be dispatched
// -> export function of reduced slice to store (postsSlice.reducer)
