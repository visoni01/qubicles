import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart, faComment, faShareAlt,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { IconButton, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { unlikePostStatus, likePostStatus } from '../../../../redux-saga/redux/actions'

const PostStatusLikeComment = ({
  userActivityId, isPostLiked, likesCount, commentsCount, toggleShowComments,
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
    <div className='post-icons-tray'>
      <ul>
        <li>
          <IconButton
            className={ postLiked ? 'liked-icon' : 'like-icon' }
            onClick={ changePostLikeStatus }
          >
            <FontAwesomeIcon className={ postLiked ? 'liked-icon' : 'like-icon' } icon={ faHeart } />
          </IconButton>
          <Button
            disableRipple
            className='option-text'
          >
            {`${ likesCount } Likes `}
          </Button>
        </li>
        <li>
          {/* WIP View Comments on Post */}
          <IconButton onClick={ () => toggleShowComments() }>
            <FontAwesomeIcon className='comment-icon' icon={ faComment } />
          </IconButton>
          {/* WIP Comment on Post */}
          {/* <p className='option-text' onClick={ () => toggleShowComments() }>
            {`${ commentsCount } Comments `}
          </p> */}
          <Button
            disableRipple
            onClick={ toggleShowComments }
            className='option-text'
          >
            {`${ commentsCount } Comments `}
          </Button>
        </li>
        <li>
          <IconButton>
            <FontAwesomeIcon className='share-icon' icon={ faShareAlt } />
          </IconButton>
          <Button
            disableRipple
            className='option-text'
          >
            {`${ '3' } Shares `}
          </Button>
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
  toggleShowComments: PropTypes.func.isRequired,
}

export default PostStatusLikeComment
