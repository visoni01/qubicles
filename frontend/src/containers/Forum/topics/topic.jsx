/* eslint-disable react/no-danger */
import React, { useCallback } from 'react'
import {
  faChevronLeft, faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button,
} from '@material-ui/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import PostComment from '../comments/postComment'
import Comments from '../comments/list'
import { topicActivity } from '../../../redux-saga/redux/actions'

const SelectedTopic = ({ backToGroup, topicDetails }) => {
  const backButton = useCallback(() => backToGroup(''), [ backToGroup ])
  const dispatch = useDispatch()

  const handleLikeButton = useCallback(() => {
    dispatch(topicActivity({
      topicId: topicDetails.id,
      activity: topicDetails.isTopicLiked ? 'unlike' : 'like',
    }))
  }, [ dispatch, topicDetails.id, topicDetails.isTopicLiked ])

  return (
    <>
      <Box className='custom-box mb-20'>
        <div className='mb-20'>
          <Button
            classes={ {
              root: 'MuiButtonBase-root button-primary-small',
              label: 'MuiButton-label button-primary-small-label',
            } }
            onClick={ backButton }
          >
            <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
            back to group
          </Button>
        </div>
        <div className='display-inline-flex is-fullwidth topic-owner'>
          <Avatar className='mr-10' src={ topicDetails.profilePic } />
          <p className='para bold margin-auto-5'>
            {topicDetails.ownerName}
          </p>
          <p className='para light margin-auto-5'>
            {moment(topicDetails.createdAt).format('MMMM DD YY hh:mm a')}
          </p>
        </div>
        <h3 className='h2 mb-20 mt-10'>
          {topicDetails.title}
        </h3>
        <p className='para' dangerouslySetInnerHTML={ { __html: topicDetails.description } } />
        <div className='section-stats mt-20'>
          <ul className='display-inline-flex mb-15'>
            <li className='para'>
              <Button
                disableRipple
                classes={ { label: 'para light' } }
                onClick={ handleLikeButton }
              >
                <FontAwesomeIcon
                  icon={ faHeart }
                  className={ topicDetails.isTopicLiked ? 'liked-icon' : '' }
                />
                {topicDetails && topicDetails.likesCount}
                {' '}
                {topicDetails && topicDetails.likesCount <= 1 ? 'Like' : 'Likes'}
              </Button>
            </li>
            <li className='para'>
              <FontAwesomeIcon icon={ faComment } />
              {topicDetails && topicDetails.commentsCount}
              {' '}
              {topicDetails && topicDetails.commentsCount <= 1 ? 'Comment' : 'Comments'}
            </li>
            <li className='para'>
              <Button
                disabled
                classes={ { label: 'para light' } }
              >
                <FontAwesomeIcon icon={ faEye } />
                {topicDetails.views}
                {' '}
                Views
              </Button>
            </li>
          </ul>
        </div>
      </Box>

      <PostComment
        topicId={ topicDetails.id }
      />

      <Comments topicId={ topicDetails.id } commentsCount={ topicDetails.commentsCount } />
    </>
  )
}

SelectedTopic.defaultProps = {
  topicDetails: {
    id: '',
    comment: '',
    createdAt: '',
    ownerName: '',
    title: '',
    description: '',
  },
}

SelectedTopic.propTypes = {
  backToGroup: PropTypes.func.isRequired,
  topicDetails: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    createdAt: PropTypes.string,
    ownerName: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isTopicLiked: PropTypes.number,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    views: PropTypes.number,
    profilePic: PropTypes.string,
  }),
}

export default SelectedTopic
