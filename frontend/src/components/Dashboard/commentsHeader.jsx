import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faClock } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import LinearProgress from '@material-ui/core/LinearProgress'
import './style.scss'

const CommentsHeader = ({
  owner, createdAt, likesCount, commentsCount,
}) => (
  <>
    <div className='header'>
      <Avatar className='avatar'>
        {owner && owner[ 0 ].toUpperCase()}
      </Avatar>
      <div className='item-title title-bar-style'>
        <div className='post-by'>
          Posted by
          <span>
            {owner}
          </span>
        </div>
        <div className='feed-time-small'>
          <span className='fa-clock-style'>
            <FontAwesomeIcon icon={ faClock } />
          </span>
          {createdAt}
        </div>
      </div>
    </div>
    <div className='like-comment-section'>
      <div className='icons'>
        <FontAwesomeIcon className='like-comment-icon' icon={ faHeart } />
        <span className='count'>{likesCount}</span>
        <FontAwesomeIcon className='like-comment-icon' icon={ faComment } />
        <span className='count'>{commentsCount}</span>
      </div>
      <div className='comments'>
        {commentsCount}
        &nbsp;
        comments
      </div>
      <div className='line' />
      <div className='action-header'>
        <span> Load more comments </span>
        <span>
          <FontAwesomeIcon className='like-comment-icon' icon={ faComment } />
          <span>Comments</span>
        </span>
      </div>
      <div className='line' />
      {/* <LinearProgress/> */}
    </div>
  </>
)

CommentsHeader.propTypes = {
  owner: PropTypes.string.isRequired,
  likesCount: PropTypes.string.isRequired,
  commentsCount: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default CommentsHeader
