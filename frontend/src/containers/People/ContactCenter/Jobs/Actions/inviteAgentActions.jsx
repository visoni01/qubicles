import React, { useState, useCallback } from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import InviteAgent from '../InviteAgent'
import '../styles.scss'

const InviteAgentActions = ({
  candidateId,
}) => {
  const [ openInviteAgentModal, setOpenInviteAgentModal ] = useState(false)
  const handleOpenInviteAgentModal = useCallback(() => setOpenInviteAgentModal((open) => !open), [])

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className=' h3 mb-30'> Actions </h3>
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
        candidateId={ candidateId }
      />
    </>
  )
}

InviteAgentActions.defaultProps = {
  candidateId: null,
}

InviteAgentActions.propTypes = {
  candidateId: PropTypes.number,
}

export default InviteAgentActions
