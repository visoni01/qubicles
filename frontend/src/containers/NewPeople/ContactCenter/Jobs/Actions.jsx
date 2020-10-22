import React, { useState, useCallback } from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import InviteAgent from './InviteAgent'
import './styles.scss'
import '../newStyles.scss'

const Actions = () => {
  const [ openInviteAgentModal, setOpenInviteAgentModal ] = useState(false)
  const handleOpenInviteAgentModal = useCallback(
    // eslint-disable-next-line no-shadow
    () => setOpenInviteAgentModal((openInviteAgentModal) => !openInviteAgentModal), [],
  )
  const handleModalClose = () => {
    setOpenInviteAgentModal(false)
  }

  return (
    <>
      <Box className='box actions-box'>
        <h3 className='heading'> Actions </h3>

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
        handleClose={ handleModalClose }
      />
    </>
  )
}

export default Actions
