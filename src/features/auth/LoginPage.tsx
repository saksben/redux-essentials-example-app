import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate } from 'react-router-dom'

import { selectAllUsers } from '@/features/users/usersSlice'
import { userLoggedIn } from './authSlice'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')

  const onUserChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value)
  }

  const onLogInClicked = () => {
    if (userId) {
      dispatch(userLoggedIn(userId))
      navigate('/posts')
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Welcome to Tweeter!</h2>
      <h3>Please log in:</h3>
      <form>
        <label htmlFor="postAuthor">User:</label>
        <select id="postAuthor" value={userId} onChange={onUserChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="button" onClick={onLogInClicked} disabled={!userId}>
          Log In
        </button>
      </form>
    </section>
  )
}
