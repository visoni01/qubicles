import React, { useState, useCallback } from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import InviteAgent from './InviteAgent'
import EndorsementsModal from '../Talent/Application/EndorsementsModal'
import './styles.scss'

const Actions = () => {
  const [ openInviteAgentModal, setOpenInviteAgentModal ] = useState(false)
  // eslint-disable-next-line no-shadow
  const handleOpenInviteAgentModal = useCallback(() => setOpenInviteAgentModal((openInviteAgentModal) => !openInviteAgentModal), [])

  const handleModalClose = () => {
    setOpenInviteAgentModal(false)
  }

  return (
    <>
      <Box className='box action-root'>
        <h3>
          <b>Actions</b>
        </h3>
        <div className='mt-10 mb-10'>
          <Button
            variant='contained'
            className='button-primary-small action-button mt-10 mb-10'
            classes={ { label: 'primary-label' } }
            onClick={ handleOpenInviteAgentModal }
          >
            Invite
          </Button>
          <Button
            variant='contained'
            className='button-secondary-small action-button mt-10 mb-10'
            classes={ { label: 'secondary-label' } }
          >
            Message
          </Button>
        </div>
      </Box>
      {/* <InviteAgent
        open={ openInviteAgentModal }
        handleClose={ handleModalClose }
      /> */}
      <EndorsementsModal
        open={ openInviteAgentModal }
        handleClose={ handleModalClose }
      />
    </>
  )
}

export default Actions
