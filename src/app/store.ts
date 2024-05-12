import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    // An example slice reducer function that returns a fixed state value
    value: (state: number = 123) => state,
  },
})
