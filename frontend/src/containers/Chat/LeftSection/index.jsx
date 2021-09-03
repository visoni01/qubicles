import {
  Box, debounce, Divider, IconButton, TextField, Tooltip,
} from '@material-ui/core'
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react'
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
  const {
    chatsList, isLoading, offset, more, searchKeyword,
  } = useSelector((state) => state.allChats)

  const [ openSearchField, setOpenSearchField ] = useState(false)
  const [ openNewChatModal, setOpenNewChatModal ] = useState(false)
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)

  const userListRef = useRef()
  const observer = useRef()

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

  // Search Conversations
  const searchConversations = useCallback(debounce((nextValue) => {
    dispatch(allChatsRequestStart({
      requestType: 'FETCH',
      dataType: 'chats-list',
      searchKeyword: nextValue,
      offset: 0,
    }))
  }, 500), [ dispatch ])

  useEffect(() => {
    if (_.isNull(isLoading)) {
      dispatch(allChatsRequestStart({
        requestType: 'FETCH',
        dataType: 'chats-list',
        offset: 0,
        searchKeyword: '',
      }))
    }
  }, [ dispatch, isLoading ])

  const handleObserver = useCallback((entries) => {
    const target = entries[ 0 ]
    if (target?.isIntersecting && more) {
      dispatch(allChatsRequestStart({
        requestType: 'FETCH',
        dataType: 'chats-list',
        offset: offset + 10,
        searchKeyword,
      }))
    }
  }, [ dispatch, more, searchKeyword, offset ])

  // Lazy loading and infinite scrolling
  /*
  Reference Links:
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  https://github.com/WebDevSimplified/React-Infinite-Scrolling/blob/master/src/App.js
  */
  const endRef = useCallback((node) => {
    const option = {
      root: userListRef.current,
      rootMargin: '0px',
      threshold: 1,
    }
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(handleObserver, option)
    if (node) observer.current.observe(node)
  }, [ handleObserver ])

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
          onChange={ (e) => searchConversations(e.target.value) }
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
      <div ref={ userListRef } className='user-list'>
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
              isRemoved={ item.isRemoved }
              isNotification={ item.isNotification }
              isImage={ item.isImage }
              selectedConversationId={ conversationId }
            />
            {index !== chatsList.length - 1 ? <Divider className='user-list-divider' /> : ''}
          </div>
        ))}
        <div ref={ endRef } />
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
