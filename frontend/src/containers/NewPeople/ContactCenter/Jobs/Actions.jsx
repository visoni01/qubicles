import React, { useState, useCallback } from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import InviteAgent from './InviteAgent'
import '../styles.scss'

const Actions = () => {
  const [ openInviteAgentModal, setOpenInviteAgentModal ] = useState(false)
  const handleOpenInviteAgentModal = useCallback(
    // eslint-disable-next-line no-shadow
    () => setOpenInviteAgentModal((openInviteAgentModal) => !openInviteAgentModal), [],
  )

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className=' h3 heading'> Actions </h3>

        <Button
          className='wide-button'
          onClick={ handleOpenInviteAgentModal }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Invite
        </Button>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Message
        </Button>
      </Box>
      <InviteAgent
        open={ openInviteAgentModal }
        handleClose={ handleOpenInviteAgentModal }
      />
    </>
  )
}

export default Actions
