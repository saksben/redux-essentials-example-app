import { createSlice } from '@reduxjs/toolkit'

// Initial users array
const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

// Slice of Redux state reducer logic/data/actions pertaining to users. Automatically generates action creators and action types corresponding to reducers and state.
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
