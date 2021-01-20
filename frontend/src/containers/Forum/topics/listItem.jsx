import React, { useCallback } from 'react'
import {
  Button, Avatar,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { carolin } from '../../../assets/images/avatar/index'
import { formatDate } from '../../../utils/common'
import { topicActivity } from '../../../redux-saga/redux/actions'
import TopicOptions from './topicOptions'

const ListItem = ({
  topic, index, setSelectedTopic, updateTopicAndToggle,
}) => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

  const childTopicData = () => {
    updateTopicAndToggle(topic)
  }

  const changeSelectedTopic = useCallback(() => {
    setSelectedTopic(index, topic.id)
  }, [ setSelectedTopic, index, topic.id ])

  const handleLikeButton = useCallback(() => {
    dispatch(topicActivity({
      topicId: topic.id,
      activity: topic.isTopicLiked ? 'unlike' : 'like',
    }))
  }, [ dispatch, topic.id, topic.isTopicLiked ])

  return (
    <>
      <div className='display-inline-flex is-fullwidth' key={ topic.id }>
        <Avatar className='mr-10' src={ carolin } />
        <div className='is-fullwidth'>
          <div className='display-inline-flex is-fullwidth'>
            <div className='group-title'>
              <Button
                className='topic-name-button'
                onClick={ changeSelectedTopic }
                classes={ {
                  root: ' background-none-hover no-padding',
                  label: 'text-align-left h4',
                } }
              >
                {topic.title}
              </Button>
            </div>
            {userDetails.user_id === topic.ownerId
            && (
            <TopicOptions
              childTopicData={ childTopicData }
              ownerId={ topic.ownerId }
              topicId={ topic.id }
              groupId={ topic.groupId }
            />
            )}
          </div>
          <div className='display-inline-flex is-fullwidth'>
            <div className='display-inline-flex is-fullwidth'>
              <p className='para'>
                {topic.ownerName}
              </p>
              <p className='para light ml-20'>
                {formatDate(topic.createdAt, 'MMMM DD YYYY, hh:mm a')}
              </p>

            </div>
          </div>
          <div className='section-stats'>
            <ul className='display-inline-flex mb-15'>
              <li className='para'>
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
              <li className='para'>
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
              <li className='para'>
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
  updateTopicAndToggle: () => {},
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
  updateTopicAndToggle: PropTypes.func,
}

export default ListItem
