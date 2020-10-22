import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton, Select, FormControl, MenuItem,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const InviteAgent = ({
  open, handleClose,
}) => {
  const [ jobType, setJobType ] = useState('')
  const [ message, setMessage ] = useState('')

  const setJobTypeCB = useCallback((event) => {
    setJobType(event.target.value)
  }, [])

  const setMessageCB = useCallback((event) => {
    setMessage(event.target.value)
  }, [])

  const handleCancelButton = () => {
    handleClose()
  }

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ handleClose }
      classes={ { paper: 'invite-agent-modal' } }
    >
      <div className='is-flex'>
        <DialogTitle className='width-full'>
          Invitation
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton className='is-size-6 mt-10' onClick={ handleClose }>
            <FontAwesomeIcon icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <h4>Invite for following position</h4>
        <FormControl>
          <Select
            MenuProps={ {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            } }
            name='jobType'
            id='jobType'
            className='dropdown'
            placeholder='skill'
            variant='outlined'
            onChange={ setJobTypeCB }
            value={ jobType }
          >
            <MenuItem value='skill 1'>skill 1</MenuItem>
            <MenuItem value='skill 2'>skill 2</MenuItem>
            <MenuItem value='skill 3'>skill 3</MenuItem>
          </Select>
        </FormControl>
        <h4>Message</h4>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          rows={ 15 }
          multiline
          variant='outlined'
          placeholder="Personalize your invitation by referring to agent's specific skill"
          value={ message }
          onChange={ setMessageCB }
          required
        />
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          className='cancel-button'
          onClick={ handleCancelButton }
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
