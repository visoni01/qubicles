import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import './style.scss'
import { useSelector } from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
import { getTimeFromNow } from '../../utils/common'
import PostStatusAction from './PostStatusAction'

const PostStatusWrap = ({
  userActivityId, activityValue, activityCustom, createdAt, owner, userId,
}) => (
  <div className='post-item animated preFadeInLeft fadeInLeft'>
    <div className='is-flex is-start is-vcenter padding-10'>
      <Avatar className='avatar'>
        {owner[ 0 ].toUpperCase()}
      </Avatar>
      <div className='item-title full-width'>
        Posted by
        <span>
          {' '}
          {owner}
        </span>
        <span className='feed-time-small float-right'>
          {getTimeFromNow(createdAt)}
          <PostStatusAction userId={ userId } userActivityId={ userActivityId } />
        </span>
        <br />
      </div>
    </div>

    <div>
      <div className='is-flex is-start is-vcenter'>
        <div className='post-text'>
          <p>
            {activityValue}
          </p>
        </div>
      </div>
      {(activityCustom) && (
        <div className='is-flex is-start is-vcenter'>
          <div className='feed-image-container'>
            <div className='soft-overlay' />
            <img src={ activityCustom } alt='demo-pic' />
          </div>
        </div>
      )}
    </div>
  </div>

)

PostStatusWrap.defaultProps = {
  activityCustom: null,
  owner: 'Marlon',
}

PostStatusWrap.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  owner: PropTypes.string,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default PostStatusWrap
