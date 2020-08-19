import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import { getTimeFromNow } from '../../utils/common'
import './style.scss'

const CommentDetails = ({ owner, content, createdAt }) => (
  <div className='comment-section'>
    <div className='avatar-parent'>
      <Avatar className='avatar'>
        {/* Display image URL */}
        { owner && owner[ 0 ].toUpperCase() }
      </Avatar>
    </div>
    <div className='comment-body'>
      <div className='username'>{owner}</div>
      <p>{ content }</p>
      <p className='comment-time'>
        {getTimeFromNow(createdAt)}
      </p>
    </div>
  </div>
)

CommentDetails.propTypes = {
  owner: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default CommentDetails
