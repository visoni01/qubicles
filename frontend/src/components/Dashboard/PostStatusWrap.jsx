import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import profileLogo1 from '../../assets/images/ray.jpg'
import './style.scss'
import { getTimeFromNow } from '../../utils/common'

const PostStatusWrap = ({
  userActivityId, activityValue, activityCustom, createdAt, owner,
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
        </span>
        <br />
      </div>
    </div>
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
)

PostStatusWrap.defaultProps = {
  activityCustom: null,
  owner: 'Marlon',
}

PostStatusWrap.propTypes = {
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  owner: PropTypes.string,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default PostStatusWrap
