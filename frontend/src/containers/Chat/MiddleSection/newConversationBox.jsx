import { Box, Button } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import NewChat from '../Common/addPeople'

const NewConversationBox = () => {
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
      <Button
        classes={ {
          root: 'button-primary-large',
          label: 'button-primary-large-label',
        } }
        onClick={ handleNewChatClick }
      >
        New Chat
      </Button>

      <p className='para light sz-xl text-center'>or</p>

      <Button
        classes={ {
          root: 'button-primary-large',
          label: 'button-primary-large-label',
        } }
        onClick={ handleNewGroupClick }
      >
        New Group
      </Button>

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

export default NewConversationBox
