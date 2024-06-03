import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

// Keeps the id array in a sorted order based on contents, and only updates if items are added/removed or order changes
const usersAdapter = createEntityAdapter()

// Initial users array
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Api endpoint for fetching users
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData)
      },
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice

// Generates new selector that will return query result object for a query within those parameters
export const selectUsersResult = apiSlice.endpoints.getUsers.select()

const emptyUsers = []

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data,
)

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
