import React, { useState } from 'react'
import {
  Avatar, Divider, TextareaAutosize, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { terry } from '../../assets/images/avatar'

const PostCommentSection = () => {
  const [ commentText, setCommentText ] = useState('')
  const handleCommentChange = (e) => {
    setCommentText(e.target.value)
  }

  const clearCommentText = () => {
    setCommentText('')
  }
  return (
    <>
      <Divider />
      <div
        className='post-comment-container'
      >
        <Avatar className='comment-avatar' alt='Remy Sharp' src={ terry } />
        <div className='create-comment'>
          <div className='comment-content'>
            <TextareaAutosize
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 1 }
              value={ commentText }
              onChange={ handleCommentChange }
              placeholder='Leave a comment...'
            />
          </div>

          { commentText && (
          <div className='comment-actions'>
            <Button
              color='secondary'
              className='cancel-button'
              onClick={ clearCommentText }
            >
              Cancel
            </Button>

            <div>

              <Button
                variant='contained'
                className='button-primary-small post-button'
                classes={ { label: 'primary-label' } }
              >
                Comment
              </Button>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PostCommentSection
