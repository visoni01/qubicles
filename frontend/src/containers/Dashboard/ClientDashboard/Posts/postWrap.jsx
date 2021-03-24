import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import PostHead from './postHead'
import PostBody from './postBody'
import { commentsArrayValidator } from '../postValidators'
import PostOptions from './postOptions'

const PostWrap = ({
  userActivityId, activityValue, activityCustom,
  createdAt, updatedAt, owner, userId, isPostLiked,
  likesCount, commentsCount, comments, commentLoading, permission,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  return (
    <Box className='custom-box mb-25'>
      <div className='display-inline-flex justify-between is-fullwidth align-items-start'>
        <PostHead
          owner={ owner }
          createdAt={ createdAt }
          updatedAt={ updatedAt }
        />
        {owner.userId === userDetails.user_id
        && (
        <PostOptions
          owner={ owner }
          createdAt={ createdAt }
          postId={ userActivityId }
          postText={ activityValue }
          postImage={ activityCustom }
          permission={ permission }
        />
        )}
      </div>

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
}

PostWrap.defaultProps = {
  activityCustom: null,
}

PostWrap.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
  comments: commentsArrayValidator.isRequired,
  commentLoading: PropTypes.bool.isRequired,
  permission: PropTypes.bool.isRequired,
}

export default React.memo(PostWrap)
