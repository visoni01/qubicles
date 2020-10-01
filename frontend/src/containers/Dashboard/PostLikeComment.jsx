import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart, faComment, faShareAlt,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { unlikePostStatus, likePostStatus } from '../../redux-saga/redux/actions'

const PostStatusLikeComment = ({
  userActivityId, isPostLiked, likesCount, commentsCount, setShowComments, setShowCommentSection,
}) => {
  const [ postLiked, setPostLiked ] = useState(isPostLiked)
  const dispatch = useDispatch()
  const data = {
    userActivityId,
  }
  const changePostLikeStatus = useCallback(() => {
    setPostLiked(!postLiked)
    if (isPostLiked) {
      dispatch(unlikePostStatus({ data }))
    } else {
      dispatch(likePostStatus({ data }))
    }
    // eslint-disable-next-line
  }, [ isPostLiked, postLiked ])

  return (
    <div className='share-like'>
      <ul>
        <li>
          <IconButton
            className={ postLiked ? 'liked-icon' : 'like-icon' }
            onClick={ changePostLikeStatus }
          >
            <FontAwesomeIcon className={ postLiked ? 'liked-icon' : 'like-icon' } icon={ faHeart } />
          </IconButton>
          <p className='option-text'>
            {`${ likesCount } Likes `}
          </p>
        </li>
        <li>
          <IconButton onClick={ () => setShowCommentSection(true) }>
            <FontAwesomeIcon className='comment-icon' icon={ faComment } />
          </IconButton>
          <p className='option-text' onClick={ () => setShowComments(true) }>
            {`${ commentsCount } Comments `}
          </p>
        </li>
        <li>
          <IconButton>
            <FontAwesomeIcon className='share-icon' icon={ faShareAlt } />
          </IconButton>
          <p className='option-text'>
            {`${ '3' } Shares `}
          </p>
        </li>
      </ul>
    </div>
  )
}

PostStatusLikeComment.propTypes = {
  userActivityId: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
  setShowComments: PropTypes.func.isRequired,
  setShowCommentSection: PropTypes.func.isRequired,
}

export default PostStatusLikeComment
