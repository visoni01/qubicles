import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, IconButton, InputBase, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEllipsisV, faEye, faHeart, faSearch, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import GroupsList from './groups'
import TrendingTopics from './trendingTopics'
import { carolin } from '../../assets/images/avatar/index'
import { groupTopicsFetchingStart, addNewGroupTopic, updateGroupTopicsList } from '../../redux-saga/redux/actions'
import NewTopicForm from './newTopic'
import { formatDate } from '../../utils/common'
import SelectedTopic from './topic'
import { UPDATE_TOPIC_STATS } from '../../redux-saga/redux/constants'

const SelectedGroup = ({ group }) => {
  const { id, title, description } = group
  const dispatch = useDispatch()
  const [ selectedTopic, setSelectedTopic ] = useState('')
  const { topics } = useSelector((state) => state.groupTopics)
  const { userDetails } = useSelector((state) => state.login)

  useEffect(() => {
    if (id) {
      dispatch(groupTopicsFetchingStart({ groupId: id }))
    }
  }, [ id ])

  // eslint-disable-next-line
  const changeTopicFormStatus = useCallback((status) => setSelectedTopic(status),
    [ setSelectedTopic ])

  const handleCreateTopic = (data) => {
    dispatch(addNewGroupTopic({ ...data, groupId: id, ownerName: userDetails.full_name }))
    setSelectedTopic('')
  }

  const selectTopic = (index, topicId) => {
    setSelectedTopic(index)
    dispatch(updateGroupTopicsList({
      type: UPDATE_TOPIC_STATS,
      topicId,
      statType: 'views',
    }))
  }

  if (selectedTopic === 'new') {
    return <NewTopicForm handleCancel={ changeTopicFormStatus } handleSubmit={ handleCreateTopic } />
  }

  if (typeof (selectedTopic) === 'number' && selectedTopic !== 'new') {
    return (
      <SelectedTopic
        topicDetails={ topics && topics[ selectedTopic ] }
        backToGroup={ changeTopicFormStatus }
        groupTitle={ title }
      />
    )
  }

  return (
    <>
      <div>
        <Box className='primary-box padding-20 mb-20'>
          <div className='section-heading display-inline-flex width-100-per'>
            <h3 className='h3'>
              {title}
            </h3>
            <IconButton className='action-button'>
              <FontAwesomeIcon icon={ faEllipsisV } />
            </IconButton>
          </div>
          <p className='para'>
            {description}
          </p>
        </Box>
        <div className='display-inline-flex width-100-per search-topic-bar'>
          <div className='search-input primary-box'>
            <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
            <InputBase
              placeholder='Search'
              className='input-field'
            />
          </div>
          <Button
            className='new-topic-button'
            classes={ {
              label: 'MuiButton-label button-primary-small-label',
              root: 'MuiButtonBase-root button-primary-small',
            } }
            onClick={ () => changeTopicFormStatus('new') }
          >
            New Topic
          </Button>
        </div>
      </div>
      <Box className='primary-box padding-20'>
        <div className='section-heading display-inline-flex width-100-per'>
          <h3 className='h3'>
            Topics in
            {' '}
            {title}
          </h3>
          <IconButton className='action-button'>
            <FontAwesomeIcon icon={ faSlidersH } />
          </IconButton>
        </div>
        <div className='mt-10'>
          {topics.length ? topics.map((topic, index) => (
            <>
              <div className='display-inline-flex topic-info width-100-per' key={ topic.id }>
                <Avatar className='mr-10' src={ carolin } />
                <div className='width-100-per'>
                  <Button
                    className='h4'
                    onClick={ () => selectTopic(index, topic.id) }
                    classes={ { root: ' background-none-hover no-padding' } }
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
                        <FontAwesomeIcon icon={ faHeart } />
                        <p>
                          274 Likes
                        </p>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={ faComment } />
                        <p>
                          {topic.commentsCount}
                          {' '}
                          Comments
                        </p>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={ faEye } />
                        <p>
                          {topic.views}
                          {' '}
                          Views
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              { (index + 1 < topics.length) && <Divider className='mb-30' />}
            </>
          )) : (
            <h4 className='h4 text-align-center padding-20'>
              No topics to show
            </h4>
          )}
        </div>
      </Box>
    </>
  )
}

SelectedGroup.defaultProps = {
  group: {
    title: '',
    description: '',
  },
}

SelectedGroup.propTypes = {
  group: {
    title: PropTypes.string,
    description: PropTypes.string,
  },
}

export default SelectedGroup
