import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import InviteAgent from '../inviteAgent'
import { allChatsRequestStart } from '../../../../../redux-saga/redux/chat'
import { REQUEST_TYPES, USERS } from '../../../../../utils/constants'
import { NEW_CHAT } from '../../../../../redux-saga/redux/constants'
import '../styles.scss'

const InviteAgentActions = ({
  candidateId, candidateName, location, profileName, profileImage,
}) => {
  const [ openInviteAgentModal, setOpenInviteAgentModal ] = useState(false)
  const [ isNewChatLoading, setIsNewChatLoading ] = useState(false)

  const { isLoading, dataType } = useSelector((state) => state.allChats)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && dataType === NEW_CHAT) {
      setIsNewChatLoading(false)
    }
  }, [ isLoading, dataType ])

  const handleOpenInviteAgentModal = useCallback(() => setOpenInviteAgentModal((open) => !open), [])

  const handleSendMessage = useCallback(() => {
    setIsNewChatLoading(true)
    dispatch(allChatsRequestStart({
      requestType: REQUEST_TYPES.CREATE,
      dataType: NEW_CHAT,
      candidate: {
        id: candidateId,
        name: candidateName,
        profilePic: profileImage,
        location,
        title: profileName,
        userCode: USERS.AGENT,
      },
      onlyPopup: true,
    }))
  }, [ dispatch, candidateId, candidateName, profileName, profileImage, location ])

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
