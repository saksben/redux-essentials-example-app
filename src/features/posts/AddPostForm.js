import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { useAddNewPostMutation } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

// AddPostForm component to add posts
export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const [addNewPost, { isLoading }] = useAddNewPostMutation() // To update the server and add a new post endpoint
  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  // Can only save post if there is a title, content, and userId, and it is not loading
  const canSave = [title, content, userId].every(Boolean) && !isLoading

  // When save button clicked and there is title, content, and userId data and addRequestStatus is idle, dispatch the action of type posts/addNewPost and pass in a new post object containing the post title, content, and user
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap()
        // Reset the form
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  // Give an option from the select that maps each user in {store} to an option
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  // Spinner while it is loading
  const spinner = isLoading ? <Spinner size="30px" /> : null

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
          {spinner}
        </div>
      </form>
    </section>
  )
}

// select "postAdded" action > payload (id, title, content) -> dispatch the "postAdded" action
