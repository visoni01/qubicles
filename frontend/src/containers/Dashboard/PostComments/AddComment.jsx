import React, { useState } from 'react'
import {
  Avatar, Divider, TextareaAutosize, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { terry } from '../../../assets/images/avatar'
import PostCommentSkeleton from './PostCommentSkeleton'

const AddComment = ({ postComment, isCommentLoading }) => {
  const [ commentText, setCommentText ] = useState('')
  const handleCommentChange = (e) => {
    setCommentText(e.target.value)
  }

  const clearCommentText = () => {
    setCommentText('')
  }

  const onCommentButtonClicked = () => {
    postComment(commentText)
    clearCommentText()
  }

  return (
    <>
      {isCommentLoading
      && <PostCommentSkeleton />}
      <Divider />
      <div
        className='post-add-new-comment'
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
                onClick={ onCommentButtonClicked }
                disabled={ isCommentLoading }
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

AddComment.propTypes = {
  postComment: PropTypes.func.isRequired,
  isCommentLoading: PropTypes.bool.isRequired,
}

export default AddComment
