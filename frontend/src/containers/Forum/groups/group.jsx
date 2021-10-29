import React, { useState, useEffect, useCallback } from 'react'
import { Box, InputBase, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewGroupTopic, updateGroupTopicsList, updateExistingGroup, updateExistingTopic, deleteGroup,
} from '../../../redux-saga/redux/actions'
import CreateOrUpdateTopicForm from '../topics/createAndUpdateTopic'
import SelectedTopic from '../topics/topic'
import { UPDATE_TOPIC_STATS } from '../../../redux-saga/redux/constants'
import TopicsList from '../topics/list'
import ScrollToTop from '../../../components/scrollToTop'
import UpdateGroup from './createOrUpdate'
import { EditIcon, SearchIcon } from '../../../assets/images/common'
import MenuOptions from '../../Shared/menuOptions'
import { DeleteIcon } from '../../../assets/images/training'

const SelectedGroup = ({ group }) => {
  const {
    id, title, description, ownerId,
  } = group

  const [ selectedTopic, setSelectedTopic ] = useState('')
  const [ selectedUpdateTopic, setSelectedUpdateTopic ] = useState(null)
  const [ openUpdateGroup, setUpdateOpenGroup ] = useState(false)
  const [ openUpdateTopic, setUpdateOpenTopic ] = useState(false)

  const { userDetails } = useSelector((state) => state.login)
  const { topics } = useSelector((state) => state.groupTopics)

  const dispatch = useDispatch()

  useEffect(() => { setSelectedTopic('') }, [ id ])

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
  }, [ dispatch, handleUpdateGroupToggle, id ])

  const updateTopicAndToggle = (childData) => {
    setSelectedUpdateTopic(childData)
    setUpdateOpenTopic(!openUpdateTopic)
  }

  const handleUpdateTopic = (topicData) => {
    dispatch(updateExistingTopic({ topicData, topicId: topicData.id }))
    updateTopicAndToggle()
  }

  const handleConfirmModal = useCallback(() => {
    dispatch(deleteGroup({
      groupId: id,
    }))
  }, [ dispatch, id ])

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
            <h3 className='h3 group-title'>{title}</h3>
            {userDetails.user_id === ownerId && (
              <MenuOptions
                handleFirstOptionClick={ handleUpdateGroupToggle }
                handleConfirmModal={ handleConfirmModal }
                confirmButtonText='Delete'
                firstOption='Edit'
                secondOption='Delete'
                FirstIcon={ EditIcon }
                SecondIcon={ DeleteIcon }
                message='Are you sure you want to delete this group ?'
              />
            )}
          </div>
          <p className='para'>{description}</p>
        </Box>
        <div className='display-inline-flex is-fullwidth mb-20'>
          <div className='display-inline-flex search-input mr-10'>
            <SearchIcon className='ml-10 mr-10 align-self-center' />
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
    handleOpenModal: () => {},
  },
}

SelectedGroup.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    ownerId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    handleOpenModal: PropTypes.func,
  }),
}

export default SelectedGroup
