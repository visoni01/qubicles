import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, InputBase, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewGroupTopic, updateGroupTopicsList, updateExistingGroup, updateExistingTopic,
} from '../../../redux-saga/redux/actions'
import CreateOrUpdateTopicForm from '../topics/createAndUpdateTopic'
import SelectedTopic from '../topics/topic'
import { UPDATE_TOPIC_STATS } from '../../../redux-saga/redux/constants'
import TopicsList from '../topics/list'
import ScrollToTop from '../../../components/ScrollToTop'
import GroupOptions from './groupOptions'
import UpdateGroup from './createOrUpdate'

const SelectedGroup = ({ group }) => {
  const {
    id, title, description, ownerId,
  } = group
  const dispatch = useDispatch()
  const [ selectedTopic, setSelectedTopic ] = useState('')
  const [ selectedUpdateTopic, setSelectedUpdateTopic ] = useState(null)
  const [ openUpdateGroup, setUpdateOpenGroup ] = useState(false)
  const [ openUpdateTopic, setUpdateOpenTopic ] = useState(false)

  const { userDetails } = useSelector((state) => state.login)
  const { topics } = useSelector((state) => state.groupTopics)

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

  const handleUpdateGroupToggle = useCallback(() => {
    setUpdateOpenGroup((state) => !state)
  }, [ setUpdateOpenGroup ])

  const handleUpdateGroup = useCallback((groupData) => {
    dispatch(updateExistingGroup({ groupData, groupId: id }))
    handleUpdateGroupToggle()
  }, [ handleUpdateGroupToggle, id ])

  const updateTopicAndToggle = (childData) => {
    setSelectedUpdateTopic(childData)
    setUpdateOpenTopic(!openUpdateTopic)
  }

  const handleUpdateTopic = (topicData) => {
    dispatch(updateExistingTopic({ topicData, topicId: topicData.id }))
    updateTopicAndToggle()
  }

  if (openUpdateTopic) {
    return (
      <CreateOrUpdateTopicForm
        handleCancel={ updateTopicAndToggle }
        updateTopic={ handleUpdateTopic }
        topicUpdateData={ selectedUpdateTopic }
        isUpdate
      />
    )
  }

  if (openUpdateTopic) {
    return (
      <CreateOrUpdateTopicForm
        // handleCancel={ handleUpdateTopicToggle }
        updateTopic={ handleUpdateTopic }
        topicUpdateData={ selectedUpdateTopic }
        isUpdate
      />
    )
  }

  if (selectedTopic === 'new') {
    return <CreateOrUpdateTopicForm handleCancel={ changeTopicFormStatus } handleSubmit={ handleCreateTopic } />
  }

  if (openUpdateGroup) {
    return (
      <UpdateGroup
        handleCloseModal={ handleUpdateGroupToggle }
        updateGroup={ handleUpdateGroup }
        groupUpdateData={ group }
        isUpdate
      />
    )
  }

  if (openUpdateGroup) {
    return (
      <UpdateGroup
        handleCloseModal={ handleUpdateGroupToggle }
        updateGroup={ handleUpdateGroup }
        groupUpdateData={ group }
        isUpdate
      />
    )
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
        <Box className='custom-box padding-20 mb-20'>
          <div className='section-heading display-inline-flex is-fullwidth'>
            <h3 className='h3 group-title'>
              {title}
            </h3>
            {userDetails.user_id === ownerId && (
              <GroupOptions
                groupId={ id }
                handleOpenModal={ handleUpdateGroupToggle }
              />
            )}
          </div>
          <p className='para'>
            {description}
          </p>
        </Box>
        <div className='display-inline-flex is-fullwidth mb-20'>
          <div className='search-input mr-10'>
            <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
            <InputBase
              placeholder='Search'
              className='input-field'
            />
          </div>
          <Button
            className='is-fullheight'
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
      <TopicsList
        groupId={ id }
        groupTitle={ title }
        setSelectedTopic={ selectTopic }
        updateTopicAndToggle={ updateTopicAndToggle }
      />
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
    handleOpenModal: PropTypes.func.isRequired,
  },
}

export default SelectedGroup
