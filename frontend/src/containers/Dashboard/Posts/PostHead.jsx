import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utils/common'
import { carolin } from '../../../assets/images/avatar'

const PostHead = ({
  owner, createdAt, updatedAt,
}) => (
  <div className='post-head'>
    <div className='display-inline-flex'>
      <Avatar className='profile-pic' alt='Remy Sharp' src={ carolin } />
      <div className='margin-auto'>
        <h4 className='h4'>
          {owner.fullName}
        </h4>
        <p className='para light'>
          {formatDate(createdAt, 'MMMM DD YYYY, hh:mm a')}
        </p>
        <p className='para light sz-sm'>
          {updatedAt && updatedAt !== createdAt && '(edited)'}
        </p>
      </div>
    </div>
  </div>
)

PostHead.propTypes = {
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,

}

export default PostHead
