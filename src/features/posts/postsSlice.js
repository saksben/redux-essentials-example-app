import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

// Initial posts array
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

// Fetch posts from api. 2 arguments: string for the prefix for the generated action types, and payload creator returning a Promise with data
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

// Add posts from api
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // Send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  },
)

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
        state.posts.push(action.payload)
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
      const existingPost = state.posts.find((post) => post.id === id) // See if there is any post in {state} that matches the {action} id
      // If a specific post already exists, update its title to {action.payload.title} and the content to {action.payload.content}
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    // reactionAdded reducer action-creator
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId) // See if there is any post in {state} that matches the {action} id
      // If a specific post already exists, increment its specified reaction's count
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  // Define additional case reducers that run in response to actions defined outside of the slice, for example an api call
  extraReducers(builder) {
    builder
      // When api request starts, status = "loading"
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      // If request succeeds, status is "succeeded", add fetched posts to state.posts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      // If request fails, status is "failed", save message into state to display
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Directly add the new post object to posts array
        state.posts.push(action.payload)
      })
  },
})

// Action to use in UI components to dispatch an action when user clicks the corresponding button
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// The posts reducer function that createSlice generated
export default postsSlice.reducer

// Select all posts, for use in components with useSelector
export const selectAllPosts = (state) => state.posts.posts

// Select a post by its id, for use in components with useSelector
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)

// actions dispatched -> slice of Redux logic/actions > reducers = postsSlice.actions > destructured action creator "postAdded" -> use action creator in UI to be dispatched
// -> export function of reduced slice to store (postsSlice.reducer)
