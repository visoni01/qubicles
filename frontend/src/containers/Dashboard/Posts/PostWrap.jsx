import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import PostHead from './PostHead'
import PostBody from './PostBody'
import { commentsArrayValidator } from '../postValidators'

const PostWrap = ({
  userActivityId,
  activityValue,
  activityCustom, createdAt, owner, userId, isPostLiked, likesCount, commentsCount, comments, commentLoading,
}) => (
  <Box className='custom-box mb-25'>
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

PostWrap.defaultProps = {
  activityCustom: null,
}

PostWrap.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  owner: PropTypes.string.isRequired,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
  comments: commentsArrayValidator.isRequired,
  commentLoading: PropTypes.bool.isRequired,
}

export default React.memo(PostWrap)