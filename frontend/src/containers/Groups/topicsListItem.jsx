import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, IconButton, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faEye, faHeart, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import { slice } from 'lodash'
import { carolin } from '../../assets/images/avatar/index'
import { formatDate } from '../../utils/common'
import { groupTopicsFetchingStart, topicActivity } from '../../redux-saga/redux/actions'
import ListSkeleton from './skeletons/topicsList'

const ListItem = ({ topic, index, setSelectedTopic }) => {
  const dispatch = useDispatch()
  const changeSelectedTopic = useCallback(() => {
    setSelectedTopic(index, topic.id)
  }, [ setSelectedTopic ])

  const handleLikeButton = useCallback(() => {
    dispatch(topicActivity({
      topicId: topic.id,
      activity: topic.isTopicLiked ? 'unlike' : 'like',
    }))
  }, [ setSelectedTopic ])

  return (
    <>
      <div className='display-inline-flex topic-info width-100-per' key={ topic.id }>
        <Avatar className='mr-10' src={ carolin } />
        <div className='width-100-per'>
          <Button
            className='h4 topic-name-button'
            onClick={ changeSelectedTopic }
            classes={ {
              root: ' background-none-hover no-padding',
              label: 'text-align-left',
            } }
          >
            {topic.title}
          </Button>
          <div className='display-inline-flex width-100-per'>
            <p className='para'>
              {topic.ownerName}
            </p>
            <p className='date ml-20'>
              {formatDate(topic.createdAt, 'MMMM DD YYYY, hh:mm a')}
            </p>
          </div>
          <div>
            <ul className='display-inline-flex action-buttons'>
              <li>
                <Button
                  disableRipple
                  classes={ { label: 'para light' } }
                  onClick={ handleLikeButton }
                >
                  <FontAwesomeIcon
                    icon={ faHeart }
                    className={ topic.isTopicLiked ? 'liked-icon' : '' }
                  />
                  {topic && topic.likesCount}
                  {' '}
                  {topic && topic.likesCount <= 1 ? 'Like' : 'Likes'}
                </Button>
              </li>
              <li>
                <Button
                  disableRipple
                  classes={ { label: 'para light' } }
                  onClick={ changeSelectedTopic }
                >
                  <FontAwesomeIcon icon={ faComment } />
                  {topic && topic.commentsCount}
                  {' '}
                  {topic && topic.commentsCount <= 1 ? 'Comment' : 'Comments'}
                </Button>
              </li>
              <li>
                <Button
                  disabled
                  classes={ { label: 'para light' } }
                >
                  <FontAwesomeIcon icon={ faEye } />
                  {topic.views}
                  {' '}
                  Views
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

ListItem.defaultProps = {
  topic: {
    id: 0,
    title: '',
    ownerName: '',
    createdAt: '',
    isTopicLiked: 0,
    likesCount: 0,
    commentsCount: 0,
  },
  index: 0,
  setSelectedTopic: () => {},
}

ListItem.propTypes = {
  topic: PropTypes.instanceOf({}),
  index: PropTypes.number,
  setSelectedTopic: PropTypes.func,
}

export default ListItem
