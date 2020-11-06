import React, {
  useCallback, useEffect, useRef, useState,
} from 'react'
import {
  faChevronLeft, faComment, faEye, faHeart, faImage, faSatelliteDish, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button, IconButton, TextareaAutosize,
} from '@material-ui/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { postTopicComment } from '../../../redux-saga/redux/actions'
import { carolin } from '../../../assets/images/avatar/index'

const PostComment = ({ topicId }) => {
  const [ comment, setComment ] = useState('')
  const [ imageFile, setImageFile ] = useState()
  const { userDetails } = useSelector((state) => state.login)
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
    dispatch(postTopicComment({
      topicId,
      comment,
      ownerName: userDetails.full_name,
    }))
    setComment('')
  }

  return (
    <Box className='primary-box padding-20 mb-20'>
      <div className='textarea-input'>
        <Avatar className='avatar' src={ carolin } />
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
      <Button
        className='post-comment-button'
        classes={ {
          root: 'MuiButtonBase-root button-primary-small',
          label: 'MuiButton-label button-primary-small-label',
        } }
        onClick={ handlePostComment }
      >
        Post
      </Button>
    </Box>
  )
}

PostComment.propTypes = {
  topicId: PropTypes.number.isRequired,
}

export default PostComment
