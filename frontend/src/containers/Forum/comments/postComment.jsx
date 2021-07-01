import React, {
  useCallback, useRef, useState,
} from 'react'
import {
  faImage, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button, IconButton, TextareaAutosize,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { postTopicComment, updateTopicComment } from '../../../redux-saga/redux/actions'

const PostComment = ({
  topicId, isEdit, closeEditModal, commentDetails,
}) => {
  const [ comment, setComment ] = useState(commentDetails.comment)
  const [ imageFile, setImageFile ] = useState()
  const { userDetails } = useSelector((state) => state.login)
  const { settings } = useSelector((state) => (
    state[ userDetails.user_code === 'employer' ? 'clientDetails' : 'agentDetails' ]
  ))
  const fileInput = useRef()

  const dispatch = useDispatch()

  const changeCommentData = (event) => {
    setComment(event.target.value)
  }

  const changeFileInput = useCallback((event) => {
    event.preventDefault()
    const file = event && event.target && event.target.files[ 0 ]
    const reader = new FileReader()

    reader.onloadend = () => {
      setImageFile(
        reader.result,
      )
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDelete = useCallback(() => setImageFile(''), [])

  const handlePostComment = () => {
    if (isEdit) {
      dispatch(updateTopicComment({
        ...commentDetails,
        comment,
      }))
      setComment('')
      closeEditModal()
    } else {
      dispatch(postTopicComment({
        topicId,
        comment,
        ownerName: userDetails.full_name,
        ownerId: userDetails.user_id,
        profilePic: settings.profilePic,
      }))
      setComment('')
    }
  }

  return (
    <Box className='custom-box mb-20'>
      <div className='textarea-input'>
        <Avatar className='avatar' src={ settings.profilePic } />
        <div className='comment-content'>
          <TextareaAutosize
            name='comment'
            placeholder='Write Something...'
            onChange={ changeCommentData }
            value={ comment }
            rowsMin={ 2 }
          />
          {imageFile && (
          <div className='post-image'>
            <img alt='post' src={ imageFile } height='300px' />
            <IconButton onClick={ handleDelete }>
              <FontAwesomeIcon icon={ faTimesCircle } />
            </IconButton>
          </div>
          )}
        </div>
        <p className='galley-icon'>
          <input
            type='file'
            className='position-absolute'
            id='photo-input'
            accept='image/*'
            ref={ fileInput }
            onChange={ changeFileInput }
          />
          <label htmlFor='photo-input'>
            <FontAwesomeIcon icon={ faImage } className='image-icon' />
          </label>
        </p>
      </div>
      <div className={
        classNames(
          'display-inline-flex is-fullwidth pr-30 mt-10',
          isEdit ? ' edit-comment-buttons pl-30' : 'post-comment-button',
        )
      }
      >
        {isEdit && (
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
          onClick={ closeEditModal }
        >
          Cancel
        </Button>
        )}
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
          onClick={ handlePostComment }
        >
          {isEdit ? 'Update' : 'Post' }
        </Button>
      </div>
    </Box>
  )
}
PostComment.defaultProps = {
  topicId: null,
  isEdit: false,
  closeEditModal: () => {},
  commentDetails: {
    comment: '',
  },
}

PostComment.propTypes = {
  topicId: PropTypes.number,
  isEdit: PropTypes.bool,
  closeEditModal: PropTypes.func,
  commentDetails: PropTypes.shape({
    comment: PropTypes.string,
  }),
}

export default PostComment
