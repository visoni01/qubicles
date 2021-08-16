import {
  Box, Divider, IconButton, TextField,
} from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { EditIcon, SearchIcon } from '../../../assets/images/common'
import UserCard from './userCard'
import NewChat from '../Common/addPeople'
import { allChatsRequestStart, currentChatRequestStart } from '../../../redux-saga/redux/chat'
import '../styles.scss'

const LeftCard = ({ setConversationId, conversationId }) => {
  const { chatsList } = useSelector((state) => state.allChats)
  const { isLoading } = useSelector((state) => state.currentChat)

  const [ openSearchField, setOpenSearchField ] = useState(false)
  const [ openNewChatModal, setOpenNewChatModal ] = useState(false)
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)

  const dispatch = useDispatch()

  const handleSearchClick = useCallback(() => {
    setOpenSearchField((prevState) => !prevState)
  }, [])

  const handleNewChatClick = useCallback(() => {
    setOpenNewChatModal((prevState) => !prevState)
  }, [])

  const handleNewGroupClick = useCallback(() => {
    setOpenNewGroupModal((prevState) => !prevState)
  }, [])

  useEffect(() => {
    dispatch(allChatsRequestStart({
      requestType: 'FETCH',
      dataType: 'chats-list',
    }))
  }, [ dispatch ])

  useEffect(() => {
    if (chatsList && chatsList.length > 0 && chatsList[ 0 ] && _.isNull(isLoading)) {
      dispatch(currentChatRequestStart({
        requestType: 'FETCH',
        dataType: 'current-chat',
        conversationId: chatsList[ 0 ].id,
      }))
    }
  }, [ chatsList, setConversationId, isLoading, dispatch ])

  return (
    <Box
      className='custom-box no-padding chat-left-section'
    >
      {/* Header */}
      <div className='is-flex is-between align-items-center chat-left-section-header'>
        <h3 className='h3'>
          Chats
        </h3>

        <div className='is-flex is-between'>
          <IconButton
            onClick={ handleSearchClick }
          >
            <SearchIcon className='search-icon' />
          </IconButton>

          <IconButton
            onClick={ handleNewChatClick }
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={ handleNewGroupClick }
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>

      {/* Search Text Field */}
      {openSearchField && (
        <TextField
          className='search-field'
          defaultValue=''
          onChange=''
          placeholder='Search...'
          margin='dense'
          variant='outlined'
        />
      )}

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

      {/* Users List */}
      <div className='user-list'>
        {chatsList && chatsList.map((item, index) => (
          <div key={ item.id }>
            <UserCard
              id={ item.id }
              name={ item.name }
              imageUrl={ item.imageUrl }
              allRead={ item.allRead }
              latestMessage={ item.latestMessage }
              time={ item.time }
              isGroup={ item.isGroup }
              selectedConversationId={ conversationId }
            />
            {index !== chatsList.length - 1 ? <Divider className='user-list-divider' /> : ''}
          </div>
        ))}
      </div>

      {chatsList && !chatsList.length && (
        <p className='para sz-xl mt-20 mb-20 text-center'>
          No conversations yet...
        </p>
      )}
    </Box>
  )
}

LeftCard.defaultProps = {
  conversationId: null,
}

LeftCard.propTypes = {
  setConversationId: PropTypes.func.isRequired,
  conversationId: PropTypes.number,
}

export default LeftCard
