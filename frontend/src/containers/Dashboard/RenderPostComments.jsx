import React from 'react'
import { Divider, Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/common'

const RenderPostComments = ({
  commentText, ownerName, createdAt, userActivityId,
}) => (
  <div className='comment-wrap'>
    <Divider />
    <div className='comment-body'>
      <Avatar
        className='avatar'
      />
      <div>
        <h4 className='user-name'>
          <b>{ownerName}</b>
        </h4>
        <p className='date'>
          {formatDate(createdAt, 'MMMM DD YYYY, hh:mm a')}
        </p>
        <p className='post-text'>
          {commentText}
        </p>
      </div>
    </div>
  </div>
)
RenderPostComments.propTypes = {
  userActivityId: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default RenderPostComments
