import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { createPostCommentStart } from '../../redux-saga/redux/actions'
import './style.scss'

const PostCommentInput = ({ userActivityId }) => {
  const dispatch = useDispatch()
  const [ commentText, setCommentText ] = useState('')
  const postComment = useCallback(() => {
    if (!(commentText && commentText.trim())) {
      return
    }

    const commentData = {
      comment: commentText,
      userActivityId,
    }

    dispatch(createPostCommentStart({ commentData }))
    setCommentText('')
  }, [ commentText ])

  const setCommentTextCB = useCallback((event) => {
    setCommentText(event.target.value)
  }, [])

  return (
    <div className='comment-input'>
      <TextField
        id='outlined-basic'
        multiline
        className='slim-scroll'
        placeholder='Add Comment...'
        rowsMax={ 2 }
        variant='outlined'
        value={ commentText }
        onChange={ setCommentTextCB }
      />

      <FontAwesomeIcon icon={ faPaperPlane } onClick={ postComment } />
    </div>
  )
}

PostCommentInput.propTypes = {
  userActivityId: PropTypes.string.isRequired,
}

export default PostCommentInput
