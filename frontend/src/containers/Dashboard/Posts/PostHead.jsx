import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utils/common'
import { carolin } from '../../../assets/images/avatar'

const PostHead = ({
  owner, createdAt,
}) => (
  <div className='display-inline-flex post-head'>
    <Avatar className='profile-pic' alt='Remy Sharp' src={ carolin } />
    <div className='post-details'>
      <h4 className='user-name'>
        {owner}
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
