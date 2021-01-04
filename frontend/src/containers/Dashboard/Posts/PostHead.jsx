import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../utils/common'
import { carolin } from '../../../assets/images/avatar'
import PostOptions from './PostOptions'

const PostHead = ({
  owner, createdAt, postId,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  return (
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
        </div>
      </div>
      {owner.userId === userDetails.user_id
        && (
        <PostOptions
          postId={ postId }
        />
        )}
    </div>
  )
}

PostHead.propTypes = {
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  postId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default PostHead
