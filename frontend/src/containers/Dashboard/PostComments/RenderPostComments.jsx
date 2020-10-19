import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utils/common'
import { terry } from '../../../assets/images/avatar'

const RenderPostComments = ({
  commentText, ownerName, createdAt,
}) => (
  <div>
    <div className='comment-body'>
      <Avatar className='comment-avatar' alt='Remy Sharp' src={ terry } />
      <div>
        <h4 className='user-name'>
          {ownerName}
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
  commentText: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default React.memo(RenderPostComments)
