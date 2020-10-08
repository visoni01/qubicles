import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import './newStyles.scss'
import PostHead from './PostHead'
import PostBody from './PostBody'

const PostStatusWrap = ({
  userActivityId,
  activityValue,
  activityCustom, createdAt, owner, userId, isPostLiked, likesCount, commentsCount, comments, commentLoading,
}) => (
  <Box className='box'>
    <PostHead
      owner={ owner }
      createdAt={ createdAt }
    />

    <PostBody
      userActivityId={ userActivityId }
      activityValue={ activityValue }
      activityCustom={ activityCustom }
      userId={ userId }
      isPostLiked={ isPostLiked }
      likesCount={ likesCount }
      commentsCount={ commentsCount }
      comments={ comments }
      commentLoading={ commentLoading }
    />
  </Box>
)

PostStatusWrap.defaultProps = {
  activityCustom: null,
}

PostStatusWrap.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  owner: PropTypes.string.isRequired,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  commentLoading: PropTypes.bool.isRequired,
}

export default React.memo(PostStatusWrap)
