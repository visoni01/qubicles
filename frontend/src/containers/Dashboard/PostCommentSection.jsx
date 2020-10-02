import React from 'react'
import { Avatar, Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const PostCommentSection = () => (
  <div>
    <Divider />
    <div className='post-comment-section'>
      <Avatar className='avatar' />
      <textarea placeholder='Leave a Comment...' />
      <input type='file' name='' className='position-absolute' />
      <span className='galley-icon'>
        <FontAwesomeIcon icon={ faImage } />
      </span>
    </div>
  </div>
)

export default PostCommentSection
