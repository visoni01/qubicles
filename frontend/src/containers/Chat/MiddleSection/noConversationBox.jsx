import { Box, Button } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { NoMessagesIcon } from '../../../assets/images/chat'
import NewChat from '../Common/addPeople'

const NoConversationBox = () => {
  const [ openNewChatModal, setOpenNewChatModal ] = useState(false)
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)

  const handleNewChatClick = useCallback(() => {
    setOpenNewChatModal((prevState) => !prevState)
  }, [])

  const handleNewGroupClick = useCallback(() => {
    setOpenNewGroupModal((prevState) => !prevState)
  }, [])

  return (
    <Box className='custom-box new-conversation-box'>
      <NoMessagesIcon />
      <div className='message-text'>
        <h2 className='h2 text-center'>No messages yet</h2>
        <h4 className='h4 text-center'>Start a chat or create a group</h4>
      </div>
      <div className='action-buttons'>
        <Button
          classes={ {
            root: 'button-primary-large',
            label: 'button-primary-large-label',
          } }
          onClick={ handleNewChatClick }
        >
          New Chat
        </Button>

        <Button
          classes={ {
            root: 'button-primary-large',
            label: 'button-primary-large-label',
          } }
          onClick={ handleNewGroupClick }
        >
          New Group
        </Button>
      </div>

      {/* New Chat Modal */}
      {openNewChatModal && (
      <NewChat
        open={ openNewChatModal }
        handleCancel={ () => setOpenNewChatModal(false) }
        actionType='NEW_CHAT'
      />
      )}

      {/* New Group Modal */}
      {openNewGroupModal && (
      <NewChat
        open={ openNewGroupModal }
        handleCancel={ () => setOpenNewGroupModal(false) }
        actionType='NEW_GROUP'
      />
      )}
    </Box>
  )
}

export default NoConversationBox
