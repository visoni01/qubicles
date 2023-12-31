import React, { useState, useCallback } from 'react'
import { Avatar, TextareaAutosize, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostComment } from '../../../../redux-saga/redux/actions'
import { USERS } from '../../../../utils/constants'

const EditComment = ({
  postId, commentId, setIsEditing, oldComment,
}) => {
  const [ commentText, setCommentText ] = useState(oldComment)

  const { userDetails } = useSelector((state) => state.login)
  const { settings } = useSelector((state) => (
    state[ userDetails.user_code === USERS.EMPLOYER ? 'clientDetails' : 'agentDetails' ]
  ))

  const dispatch = useDispatch()

  const handleCommentChange = (e) => {
    setCommentText(e.target.value)
  }

  const onCommentButtonClicked = useCallback(() => {
    dispatch(updatePostComment({
      postId,
      commentId,
      updatedComment: commentText,
    }))
    setIsEditing(false)
    setCommentText('')
  }, [ dispatch, setIsEditing, postId, commentId, commentText ])

  const textFieldKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }, [ setIsEditing ])

  return (
    <>
      <div className='post-add-new-comment'>
        <Avatar className='comment-avatar' alt={ userDetails.full_name } src={ settings.profilePic } />
        <div className='create-comment'>
          <div className='comment-content'>
            <TextareaAutosize
              autoFocus
              id='edit-comment-input'
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 2 }
              value={ commentText }
              onChange={ handleCommentChange }
              onKeyDown={ textFieldKeyDown }
              placeholder='Write Something...'
              className='para'
            />
          </div>
          <div className='mb-10'>
            <Button
              classes={ {
                label: 'button-primary-text-label red',
                root: 'button-primary-text',
              } }
              onClick={ () => setIsEditing(false) }
            >
              Cancel
            </Button>
            <Button
              classes={ {
                label: 'button-primary-text-label',
                root: 'button-primary-text',
              } }
              disabled={ commentText === oldComment || commentText === '' }
              onClick={ onCommentButtonClicked }
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

EditComment.propTypes = {
  postId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  oldComment: PropTypes.string.isRequired,
}

export default EditComment
