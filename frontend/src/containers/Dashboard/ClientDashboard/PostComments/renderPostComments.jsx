import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getTimeFromNow } from '../../../../utils/common'
import { terry } from '../../../../assets/images/avatar'
import CommentOptions from './commentOptions'
import EditComment from './editComment'

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
          <Avatar className='avatar' alt='Remy Sharp' src={ terry } />
          <div className='pt-5'>
            <div className='comment-box'>
              <h4 className='h4 sz-sm'>
                {ownerName}
              </h4>
              <p className='para mt-5'>
                {commentText}
              </p>
            </div>
            <div className='display-inline-flex pl-10'>
              <p className='para light sz-sm'>
                {getTimeFromNow(createdAt)}
              </p>
              <p className='para sz-sm light ml-5'>
                {updatedAt && updatedAt !== createdAt && '(edited)'}
              </p>
            </div>
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

RenderPostComments.defaultProps = {
  updatedAt: null,
}

RenderPostComments.propTypes = {
  postId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
}

export default React.memo(RenderPostComments)
