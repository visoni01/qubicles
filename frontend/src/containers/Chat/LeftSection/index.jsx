import {
  Box, Divider, IconButton, TextField, Tooltip,
} from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { SearchIcon } from '../../../assets/images/common'
import UserCard from './userCard'
import NewChat from '../Common/addPeople'
import { allChatsRequestStart } from '../../../redux-saga/redux/chat'
import { NewChatIcon, NewGroupIcon } from '../../../assets/images/chat'
import '../styles.scss'

const LeftCard = ({ conversationId }) => {
  const { chatsList, isLoading } = useSelector((state) => state.allChats)

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
    if (_.isNull(isLoading)) {
      dispatch(allChatsRequestStart({
        requestType: 'FETCH',
        dataType: 'chats-list',
      }))
    }
  }, [ dispatch, isLoading ])

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
          <Tooltip title='Search'>
            <IconButton
              onClick={ handleSearchClick }
            >
              <SearchIcon className='search-icon' />
            </IconButton>
          </Tooltip>

          <Tooltip title='New Chat'>
            <IconButton
              onClick={ handleNewChatClick }
            >
              <NewChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='New Group'>
            <IconButton
              onClick={ handleNewGroupClick }
            >
              <NewGroupIcon />
            </IconButton>
          </Tooltip>
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
          <div key={ item.id } className={ `user-card-root ${ conversationId === item.id ? 'selected' : '' }` }>
            <UserCard
              id={ item.id }
              name={ item.name }
              imageUrl={ item.imageUrl }
              allRead={ item.allRead }
              latestMessage={ item.latestMessage }
              dateTime={ item.dateTime }
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
  conversationId: PropTypes.number,
}

export default LeftCard
