import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { formatDate } from '../../../../utils/common'

const PostHead = ({
  owner, createdAt, updatedAt,
}) => (
  <div className='post-head'>
    <div className='display-inline-flex'>
      <Avatar className='profile-pic' alt={ owner.fullName } src={ owner.profilePic } />
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

PostHead.defaultProps = {
  updatedAt: null,
}

PostHead.propTypes = {
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    profilePic: PropTypes.string,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,

}

export default PostHead
