import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Button, CircularProgress,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import InviteAgent from '../inviteAgent'
import '../styles.scss'
import { allChatsRequestStart } from '../../../../../redux-saga/redux/chat'

const InviteAgentActions = ({
  candidateId, candidateName, location, profileName, profileImage,
}) => {
  const [ openInviteAgentModal, setOpenInviteAgentModal ] = useState(false)
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)
  const { isLoading, dataType } = useSelector((state) => state.allChats)
  const dispatch = useDispatch()

  const handleOpenInviteAgentModal = useCallback(() => setOpenInviteAgentModal((open) => !open), [])

  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: 'CREATE',
      dataType: 'new-chat',
      candidate: {
        id: candidateId,
        name: candidateName,
        profilePic: profileImage,
        location,
        title: profileName,
        userCode: 'agent',
      },
      onlyPopup: true,
    }))
  }, [ dispatch, candidateId, candidateName, profileName, profileImage, location ])

  useEffect(() => {
    if (!isLoading && dataType === 'new-chat') {
      setIsNewChatLoading(false)
    }
  }, [ isLoading, dataType ])

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
          onClick={ handleSendMessage }
          disabled={ isNewChatLoading }
        >
          Message
          {isNewChatLoading && <CircularProgress size={ 20 } className='message-button-loader' />}
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
  candidateName: '',
  location: '',
  profileName: '',
  profileImage: '',
}

InviteAgentActions.propTypes = {
  candidateId: PropTypes.number,
  candidateName: PropTypes.string,
  location: PropTypes.string,
  profileName: PropTypes.string,
  profileImage: PropTypes.string,
}

export default InviteAgentActions
