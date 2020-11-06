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
import GroupsList from './groupsList'
import TrendingTopics from './trendingTopics'
import { carolin } from '../../assets/images/avatar/index'
import { groupTopicsFetchingStart, addNewGroupTopic, updateGroupTopicsList } from '../../redux-saga/redux/actions'
import NewTopicForm from './newTopic'
import { formatDate } from '../../utils/common'
import SelectedTopic from './topic'
import { UPDATE_TOPIC_STATS } from '../../redux-saga/redux/constants'
import TopicsList from './topicsList'
import ScrollToTop from '../../components/ScrollToTop'

const SelectedGroup = ({ group }) => {
  const { id, title, description } = group
  const dispatch = useDispatch()
  const [ selectedTopic, setSelectedTopic ] = useState('')
  const { topics } = useSelector((state) => state.groupTopics)
  const { userDetails } = useSelector((state) => state.login)

  useEffect(() => {
    setSelectedTopic('')
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
      <>
        <SelectedTopic
          topicDetails={ topics && topics[ selectedTopic ] }
          backToGroup={ changeTopicFormStatus }
          groupTitle={ title }
        />
        <ScrollToTop manualScroll />
      </>
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
            <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
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
      <TopicsList groupId={ id } groupTitle={ title } setSelectedTopic={ selectTopic } />
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
