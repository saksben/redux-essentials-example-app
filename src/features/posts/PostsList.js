import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

// PostsList component. Will read the state.posts value from the store, then loop over the posts and show each on screen
export const PostsList = () => {
  // Selects the posts state value from the store. React components can read data from the Redux store using the useSelector hook
  const posts = useSelector((state) => state.posts)

  // Sorts posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  // Creates a post component for each post
  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
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
