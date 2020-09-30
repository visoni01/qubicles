import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/common'

const PostHead = ({
  owner, createdAt,
}) => (
  <div className='display-inline-flex'>
    <Avatar
      className='avatar'
    />
    <div>
      <h4 className='user-name'>
        <b>{owner}</b>
      </h4>
      <p className='date'>
        {formatDate(createdAt, 'MMMM DD YYYY, hh:mm a')}
      </p>
    </div>
  </div>
)

PostHead.propTypes = {
  owner: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default PostHead
