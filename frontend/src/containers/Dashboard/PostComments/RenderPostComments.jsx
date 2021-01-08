import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../utils/common'
import { terry } from '../../../assets/images/avatar'
import CommentOptions from './CommentOptions'
import EditComment from './EditComment'

const RenderPostComments = ({
  ownerId, postId, commentId, commentText, ownerName, createdAt, updatedAt,
}) => {
  const [ isEditing, setIsEditing ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)
  return (
    <>
      {!isEditing && (
      <div className='comment-body'>
        <div className='profile-head-info'>
          <Avatar className='comment-avatar' alt='Remy Sharp' src={ terry } />
          <div className='pt-5'>
            <h4 className='h4 sz-sm'>
              {ownerName}
            </h4>
            <div className='display-inline-flex'>
              <p className='para light sz-sm'>
                {formatDate(createdAt, 'MMMM DD YYYY, hh:mm a')}
              </p>
              <p className='para sz-sm light ml-10'>
                {updatedAt && updatedAt !== createdAt && 'Edited'}
              </p>
            </div>
            <p className='para mb-10'>
              {commentText}
            </p>
          </div>
        </div>
        {userDetails.user_id === ownerId && (
          <CommentOptions
            setIsEditing={ setIsEditing }
            postId={ postId }
            commentId={ commentId }
          />
        )}
      </div>
      )}
      {isEditing && (
      <EditComment
        oldComment={ commentText }
        setIsEditing={ setIsEditing }
        postId={ postId }
        commentId={ commentId }
      />
      )}
    </>
  )
}
RenderPostComments.propTypes = {
  postId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

export default React.memo(RenderPostComments)
