import React from 'react'
import CommentDetails from './commentDetails'
import './style.scss'

const PostComments = () => (
  <div className='comments-container'>
    <div className='comments-list slim-scroll'>
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
      <CommentDetails
        owner='Marlon'
        createdAt={ new Date() }
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.'
      />
    </div>
  </div>
)

export default PostComments
