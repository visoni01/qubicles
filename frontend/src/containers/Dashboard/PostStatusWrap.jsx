import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Box } from '@material-ui/core'
import './newStyles.scss'
import PostHead from './PostHead'
import PostBody from './PostBody'

const PostStatusWrap = ({
  userActivityId, activityValue, activityCustom, createdAt, owner, userId, isPostLiked, likesCount, commentsCount,
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
}

export default PostStatusWrap
