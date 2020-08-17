import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import {
  faLightbulb, faHeart, faReply, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { formatDate, getTimeFromNow, isUserOwner } from '../../../utils/common'
import TopAction from '../TopAction'
import { ownerDetails } from '../forumValidators'
import { deleteTopicComment } from '../../../redux-saga/redux/actions'
import CommentLikeIcon from './CommentLikeIcon'
import './style.scss'
import ConfirmationModal from '../../CommonModal/ConfirmationModal'
import PostActions from './PostActions'

const Post = ({
  postMeta, postBody, postId, postLiked,
}) => {
  const isEdited = !postMeta.updatedAt === postMeta.createdAt

  return (
    <div className='post'>
      <div className='post-meta'>
        <div className='post-owner'>
          <img className='avatar' src={ postMeta.ownerDetails.profileImage } alt='' />
          <div className='badge'>
            <i className='material-icons'><FontAwesomeIcon icon={ faLightbulb } /></i>
          </div>
        </div>
      </div>
      <div className='post-content'>
        <div className='top-wrap'>
          <div className='name-wrap'>
            <div className='name'>{`@${ postMeta.ownerDetails.userName }`}</div>
            <span>
              {`${ formatDate(postMeta.createdAt, 'DD MMMM YY,') } at
          ${ formatDate(postMeta.createdAt, 'hh:mma') }`}
            </span>
          </div>
          <div className='top-actions'>
            {/* Like Icon */}
            <CommentLikeIcon postId={ postId } totalLikes={ postMeta.totalLikes } postLiked={ postLiked } />
            <PostActions isOwner={ isUserOwner(postMeta.ownerDetails.userId) } postId={ postId } comment={ postBody.content } />
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <div className='post-body content' dangerouslySetInnerHTML={ { __html: postBody.content } } />
        {isEdited && <div className='edited-text'>{`Edited ${ getTimeFromNow(postMeta.updatedAt) }`}</div>}
      </div>
    </div>
  )
}

Post.propTypes = {
  postMeta: PropTypes.shape({
    ownerDetails,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    totalReplies: PropTypes.number.isRequired,
  }).isRequired,
  postId: PropTypes.number.isRequired,
  postBody: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
  postLiked: PropTypes.bool.isRequired,
}

export default Post
