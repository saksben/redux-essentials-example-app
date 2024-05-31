import React from 'react'
import { useSelector } from 'react-redux'

// PostsList component. Will read the state.posts value from the store, then loop over the posts and show each on screen
export const PostsList = () => {
  // Selects the posts state value from the store. React components can read data from the Redux store using the useSelector hook
  const posts = useSelector((state) => state.posts)

  // Creates a post component for each post
  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

// component > select store's "posts" field (useSelector) -> postsSlice -> receive data from store (useSelector) > map store data to posts -> return/render mapped posts as initial UI