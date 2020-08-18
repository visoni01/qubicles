import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart, faClock, faComment, faTimes, faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import Avatar from '@material-ui/core/Avatar'
import LinearProgress from '@material-ui/core/LinearProgress'
import { hideCommentsSection } from '../../redux-saga/redux/actions'
import defaultPic from '../../assets/images/default-post-status-image.jpg'

const PostCommentSection = () => {
  const dispatch = useDispatch()
  const onClickHandlerCB = useCallback(() => {
    dispatch(hideCommentsSection())
  }, [ dispatch ])

  const { showCommentSection, data } = useSelector((state) => state.commentsSection)

  if (!showCommentSection) {
    return <></>
  }

  return (
    <div className='post-comments-section'>

      <div className='image-container'>
        <img
          src={ data.img || defaultPic }
          alt='post image'
        />
      </div>
      <div className='comment-container'>
        <div className='comment-section-body'>
          <div className='close-icon-custom'>
            <FontAwesomeIcon icon={ faTimes } onClick={ onClickHandlerCB } className='remove-icon' />
          </div>
          <div>
            <div className='header'>
              <Avatar className='avatar'>
                {data.owner && data.owner[ 0 ].toUpperCase()}
              </Avatar>
              <div className='item-title title-bar-style'>
                <div className='post-by'>
                  Posted by
                  <span>
                    {data.owner}
                  </span>
                </div>
                <div className='feed-time-small'>
                  <span className='fa-clock-style'>
                    <FontAwesomeIcon icon={ faClock } />
                  </span>
                  {data.createdAt}
                </div>
              </div>
            </div>
            <div className='like-comment-section'>
              <div className='icons'>
                <FontAwesomeIcon className='like-comment-icon' icon={ faHeart } />
                <span className='count'>{data.likesCount}</span>
                <FontAwesomeIcon className='like-comment-icon' icon={ faComment } />
                <span className='count'>{data.commentsCount}</span>
              </div>
              <div className='comments '>
                {data.commentsCount}
                {' '}
                comments
              </div>
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
          <div className='comments-container'>
            <div className='comments-list'>
              <div className='comment-section'>
                <div className='avatar-parent'>
                  <Avatar className='avatar'>
                    M
                  </Avatar>
                </div>
                <div className='comment-body'>
                  <div className='username'>Dan Walker</div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.</p>
                </div>
              </div>

              <div className='comment-section'>
                <div className='avatar-parent'>
                  <Avatar className='avatar'>
                    M
                  </Avatar>
                </div>
                <div className='comment-body'>
                  <div className='username'>Dan Walker</div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros.</p>
                </div>
              </div>
            </div>
          </div>

          <div className='comment-input'>
            <TextField
              id='outlined-basic'
              multiline
              placeholder='Add Comment...'
              rowsMax={ 2 }
              variant='outlined'
            />
            <FontAwesomeIcon icon={ faPaperPlane } />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCommentSection
