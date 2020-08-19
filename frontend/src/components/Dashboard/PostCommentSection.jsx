import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { hideCommentsSection } from '../../redux-saga/redux/actions'
import defaultPic from '../../assets/images/default-post-status-image.jpg'
import PostCommentInput from './postCommentInput'
import PostComments from './postComments'
import CommentsHeader from './commentsHeader'

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
          src={ data.imgSrc || defaultPic }
          alt='post image'
        />
      </div>
      <div className='comment-container'>
        <div className='comment-section-body'>
          <div className='close-icon-custom'>
            <FontAwesomeIcon icon={ faTimes } onClick={ onClickHandlerCB } className='remove-icon' />
          </div>
          <div>
            <CommentsHeader
              owner={ data.owner }
              userActivityId={ data.postStatusId }
              limit={ 10 }
              offset={ 0 }
              createdAt={ data.createdAt }
            />
          </div>
          <PostComments limit={ 10 } offset={ 0 } userActivityId={ data.postStatusId } />
          <PostCommentInput userActivityId={ data.postStatusId } />
        </div>
      </div>
    </div>
  )
}

export default PostCommentSection
