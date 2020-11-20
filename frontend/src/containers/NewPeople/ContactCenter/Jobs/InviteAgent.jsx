import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Button,
  IconButton, Select, FormControl, InputLabel,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const InviteAgent = ({
  open, handleClose,
}) => {
  const [ inviteAgentData, setInviteAgentData ] = useState({
    jobType: '',
    inviteMessage: '',
  })
  const availableCategories = [ 'Customer Service', 'Phone Calling', 'Email Support', 'Active Sales', 'Agent Support' ]
  const setInviteAgentDataCB = useCallback((event) => {
    const { name, value } = event.target
    setInviteAgentData((currentInviteAgentData) => ({
      ...currentInviteAgentData,
      [ name ]: value,
    }))
  }, [ ])

  const handleCancelButton = () => {
    handleClose()
  }

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      // classes={ { paper: 'invite-agent-modal' } }
      className='custom-modal'

    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'>Invitation</h2>
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
        <h4 className='h4'>Invite for following position</h4>
        <div>
          <FormControl variant='outlined' className='drop-down-bar'>
            <InputLabel margin='dense' variant='outlined'>Choose job category</InputLabel>
            <Select
              margin='dense'
              variant='outlined'
              native
              label='Choose job category'
              onChange={ setInviteAgentDataCB }
              className='dropdown'
              name='jobType'
            >
              <option aria-label='None' value='' />
              {availableCategories.map((skill) => (
                <option key={ skill } value={ skill }>
                  {skill}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <h4 className='h4 mt-20'>Message</h4>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          rows={ 15 }
          multiline
          variant='outlined'
          placeholder="Personalize your invitation by referring to agent's specific skill"
          value={ inviteAgentData.inviteMessage }
          onChange={ setInviteAgentDataCB }
          required
          name='inviteMessage'
        />
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          color='secondary'
          className='cancel-button'
          onClick={ handleClose }
        >
          Cancel
        </Button>
        <Button
          className='button-primary-small'
          classes={ { label: 'primary-label' } }
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

InviteAgent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default InviteAgent