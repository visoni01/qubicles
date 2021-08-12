import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Loader from '../../loaders/circularLoader'
import PersonCard from '../Common/personCard'
import { currentChatRequestStart } from '../../../redux-saga/redux/chat'

const ViewMembers = ({
  open, handleClose, members, conversationId,
}) => {
  const dispatch = useDispatch()

  const handleRemove = useCallback((id) => {
    dispatch(currentChatRequestStart({
      requestType: 'UPDATE',
      dataType: 'remove-person',
      conversationId,
      candidateId: id,
    }))
  }, [ dispatch, conversationId ])

  return (
    <Dialog
      scroll='paper'
      open={ open }
      onClose={ handleClose }
      maxWidth='sm'
      fullWidth
      className='custom-modal auto-height view-members-modal'
    >
      <div className='header'>
        <DialogTitle className='is-fullwidth'>
          <div className='display-inline-flex align-items-center'>
            <div className='h2'>
              Members
            </div>

            {false && (
            <Loader
              className='static-small-loader'
              enableOverlay={ false }
              displayLoaderManually
              size={ 25 }
            />
            )}
          </div>
        </DialogTitle>

        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>

      <DialogContent>
        <div>
          {members && members.map((person) => (
            <PersonCard
              key={ person.id }
              id={ person.id }
              name={ person.name }
              title={ person.title }
              profilePic={ person.profilePic }
              userCode={ person.userCode }
              actionType='VIEW_MEMBERS'
              handleRemove={ handleRemove }
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

ViewMembers.defaultProps = {
  open: false,
}

ViewMembers.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  conversationId: PropTypes.number.isRequired,
  // To Do: Add proptype validation
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default ViewMembers
