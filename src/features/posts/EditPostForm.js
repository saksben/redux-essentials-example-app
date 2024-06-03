import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice'

// EditPostForm component to edit posts
export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  //   Find the specific post by id
  const { data: post } = useGetPostQuery(postId)

  const [updatePost, { isLoading }] = useEditPostMutation()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  //   When Save button clicked and there is title and content data, dispatch the action of type posts/postUpdated with the updated title and content, and push post's url to history
  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content })
      history.push(`/posts/${postId}`)
    }
  }

  const spinner = isLoading ? <Spinner text="Saving..." /> : null

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
      {spinner}
    </section>
  )
}
