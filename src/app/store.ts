import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    // An example slice reducer function that returns a fixed state value
    value: (state: number = 123) => state,
  },
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
