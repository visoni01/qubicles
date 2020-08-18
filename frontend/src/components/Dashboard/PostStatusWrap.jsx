import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { getTimeFromNow } from '../../utils/common'
import PostStatusAction from './PostStatusAction'
import PostStatusLikeComment from './postStatusLikeComment'
import './style.scss'

const PostStatusWrap = ({
  userActivityId, activityValue, activityCustom, createdAt, owner, userId, isPostLiked, likesCount, commentsCount,
}) => (
  <div className='post-item post-item-custom animated preFadeInLeft fadeInLeft'>
    <div className='is-flex is-start is-vcenter padding-10'>
      <Avatar className='avatar'>
        {owner && owner[ 0 ].toUpperCase()}
      </Avatar>
      <div className='item-title title-bar-style'>
        <div>
          Posted by
          <span>
            &nbsp;
            {owner}
          </span>
        </div>
        <div className='feed-time-small'>
          <span className='fa-clock-style'>
            <FontAwesomeIcon icon={ faClock } />
          </span>
          {getTimeFromNow(createdAt)}
        </div>
      </div>
      <div className='feed-time-small float-right icon-style'>
        <PostStatusAction userId={ userId } userActivityId={ userActivityId } />
      </div>
    </div>

    <div>
      <div className='is-flex is-start is-vcenter post-text-container'>
        <div className='post-text'>
          <p>
            {activityValue}
          </p>
        </div>
      </div>
      {(activityCustom) && (
        <div className='is-flex is-start is-vcenter'>
          <div className='feed-image-container image-root'>
            <div className='soft-overlay' />
            <img src={ activityCustom } alt='demo-pic' />
          </div>
        </div>
      )}
    </div>
    <div className='status-activity'>
      <PostStatusLikeComment
        userActivityId={ userActivityId }
        isPostLiked={ isPostLiked }
        likesCount={ likesCount }
        commentsCount={ commentsCount }
      />
    </div>
  </div>
)

PostStatusWrap.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
}

export default PostStatusWrap
