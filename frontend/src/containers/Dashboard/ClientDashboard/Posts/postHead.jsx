import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { formatDate } from '../../../../utils/common'
import { carolin } from '../../../../assets/images/avatar'

const PostHead = ({
  owner, createdAt, updatedAt,
}) => (
  <div className='post-head'>
    <div className='display-inline-flex'>
      <Avatar className='profile-pic' alt='Remy Sharp' src={ carolin } />
      <div className='margin-auto'>
        <h4 className='h4'>
          {_.startCase(_.upperFirst(owner.fullName))}
        </h4>
        <div className='display-inline-flex'>
          <p className='para light'>
            {formatDate(createdAt, 'MMMM DD YYYY, hh:mm a')}
          </p>
          <p className='para light ml-5'>
            {updatedAt && updatedAt !== createdAt && '(edited)'}
          </p>
        </div>
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