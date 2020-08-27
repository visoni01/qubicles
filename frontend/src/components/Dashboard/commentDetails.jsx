import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getTimeFromNow, isUserOwner } from '../../utils/common'
import './style.scss'
import PostCommentAction from './PostCommentAction'

const CommentDetails = ({
  owner, content, createdAt, userActivityId, postUserActivityId, ownerId,
}) => {
  const { data } = useSelector((state) => state.commentsSection)
  return (
    <div className='comment-section'>
      <div className='avatar-parent'>
        <Avatar className='avatar'>
          {/* Display image URL */}
          { owner && owner[ 0 ].toUpperCase() }
        </Avatar>
      </div>
      <div className=' comment-body'>
        <div className='columns'>
          <div className='column is-10 username'>
            {owner}
          </div>
          { (isUserOwner(data.userId) || isUserOwner(ownerId)) && (
          <div className='column is-1 comment-menu'>
            <PostCommentAction content={ content } postUserActivityId={ postUserActivityId } userActivityId={ userActivityId } />
          </div>
          )}
        </div>
        <p>{ content }</p>
        <p className='comment-time'>
          {getTimeFromNow(createdAt)}
        </p>
      </div>
    </div>
  )
}

CommentDetails.propTypes = {
  owner: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  userActivityId: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  postUserActivityId: PropTypes.string.isRequired,
}

export default CommentDetails
