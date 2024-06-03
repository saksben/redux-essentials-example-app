// TODO: For some reason, the reactions aren't incrementing on individual post, but can be seen on main page whether added from main page or individual post

import React from 'react'
import { useAddReactionMutation } from '../api/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

// ReactionButtons component to show reaction emojis
export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([reactionName, emoji]) => {
      return (
        <button
          key={reactionName}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            addReaction({ postId: post.id, reaction: reactionName })
          }
        >
          {emoji} {post.reactions[reactionName]}
        </button>
      )
    },
  )
  return <div>{reactionButtons}</div>
}
