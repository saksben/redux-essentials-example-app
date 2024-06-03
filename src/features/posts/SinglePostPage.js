import React from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

// SinglePostPage component, where you can view page of a single post
export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  //   Find specific post from postId passed from {match} prop
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content

  //   Make spinner while fetching, else render post
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  }

  return <section>{content}</section>
}
