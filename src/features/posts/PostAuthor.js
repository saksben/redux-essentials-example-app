import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

// PostAuthor component to add an author credit span
export const PostAuthor = ({ userId }) => {
    // Finds a specific author by their id
  const author = useSelector((state) =>
    selectUserById(state, userId),
  )
  return <span>by {author ? author.name : "Unknown author"}</span>
}
