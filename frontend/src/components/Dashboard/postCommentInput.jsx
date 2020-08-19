import React from 'react'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import './style.scss'

const PostCommentInput = () => (
  <div className='comment-input'>
    <TextField
      id='outlined-basic'
      multiline
      className='slim-scroll'
      placeholder='Add Comment...'
      rowsMax={ 2 }
      variant='outlined'
    />
    <FontAwesomeIcon icon={ faPaperPlane } />
  </div>
)

export default PostCommentInput
