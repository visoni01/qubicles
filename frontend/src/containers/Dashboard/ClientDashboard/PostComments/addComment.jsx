import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Avatar, TextareaAutosize, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import PostCommentSkeleton from './postCommentSkeleton'

const AddComment = ({ postComment, isCommentLoading }) => {
  const [ commentText, setCommentText ] = useState('')
  const { userDetails } = useSelector((state) => state.login)
  const { settings: clientSettings } = useSelector((state) => state.clientDetails)
  const { settings: agentSettings } = useSelector((state) => state.agentDetails)

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
      <div
        className='post-add-new-comment pl-5'
      >
        <Avatar
          className='comment-avatar'
          alt={ userDetails.full_name }
          src={ _.isEqual(userDetails.user_code, 'employer') ? clientSettings.profilePic : agentSettings.profilePic }
        />
        <div className='create-comment'>
          <div className='comment-content'>
            <TextareaAutosize
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 2 }
              value={ commentText }
              onChange={ handleCommentChange }
              placeholder='Leave a comment...'
              className='para'
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
