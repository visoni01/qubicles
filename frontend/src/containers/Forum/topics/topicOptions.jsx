import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteGroupTopic } from '../../../redux-saga/redux/actions'
import ConfirmationModal from '../../../components/CommonModal/ConfirmationModal'

const TopicOptions = ({
  topicId, ownerId, groupId, childTopicData,
}) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDelete ] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenOptions(false)
    setAnchorEl(null)
  }

  const handleTopicOptionClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleCancelActivity = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenConfirmDelete(false)
  }, [])

  const handleConfirmDeleteTopic = useCallback(() => {
    setOpenConfirmDelete(false)
    setOpenOptions(false)
    setAnchorEl(null)
    dispatch(deleteGroupTopic({
      topicId, ownerId, groupId,
    }))
  }, [ topicId, dispatch ])

  return (
    <>
      <IconButton
        onClick={ handleTopicOptionClick }
        classes={ { root: 'topic-action-button' } }
      >
        <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-md dark' />
      </IconButton>
      <Popover
        open={ openOptions }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        elevation={ 0 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'right',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
      >
        <div className='group-options border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ childTopicData }
            startIcon={ <FontAwesomeIcon icon={ faPen } className='custom-fa-icon dark mr-5' /> }
          >
            <p className='para'> Edit </p>
          </Button>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ () => setOpenConfirmDelete(true) }
            startIcon={ <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon dark mr-5' /> }
          >
            <p className='para red'> Delete </p>
          </Button>
        </div>
      </Popover>
      <ConfirmationModal
        open={ openConfirmDeleteModal }
        handleClose={ handleCancelActivity }
        message='Are you sure you want to delete this topic ?'
        confirmButtonText='Delete'
        handleConfirm={ handleConfirmDeleteTopic }
      />
    </>
  )
}

TopicOptions.propTypes = {
  topicId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
  childTopicData: PropTypes.func.isRequired,
}

export default TopicOptions
