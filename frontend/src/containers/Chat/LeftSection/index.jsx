/* eslint-disable complexity */
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
import { allChatsRequestStart, chatDataRequestStart, updateCurrentChatId } from '../../../redux-saga/redux/chat'
import { NewChatIcon, NewGroupIcon } from '../../../assets/images/chat'
import LeftSectionSkeleton from '../../../components/Chat/Skeletons/leftSectionSkeleton'
import '../styles.scss'

const LeftCard = ({ conversationId }) => {
  const {
    chatsList, isLoading, offset, more, searchKeyword, dataType, success,
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

  const handleOpenChat = useCallback((id) => {
    if (id !== conversationId) {
      const currentChat = _.find(chatsList, { id: conversationId })
      if (currentChat && !currentChat.allRead) {
        dispatch(chatDataRequestStart({
          requestType: 'UPDATE',
          dataType: 'mark-as-read',
          conversationId,
        }))
      }
      dispatch(updateCurrentChatId({ conversationId: id }))
    }
  }, [ dispatch, chatsList, conversationId ])

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
      threshold: 0.9,
    }
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(handleObserver, option)
    if (node) observer.current.observe(node)
  }, [ handleObserver ])

  useEffect(() => {
    if (!isLoading && success && [ 'new-chat', 'new-group' ].includes(dataType)) {
      if (_.isEqual(dataType, 'new-chat')) {
        setOpenNewChatModal(false)
      } else if (_.isEqual(dataType, 'new-group')) {
        setOpenNewGroupModal(false)
      }
    }
  }, [ isLoading, success, dataType ])

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
        loading={ isLoading && _.isEqual(dataType, 'new-chat') }
      />
      )}

      {/* New Group Modal */}
      {openNewGroupModal && (
      <NewChat
        open={ openNewGroupModal }
        handleCancel={ () => setOpenNewGroupModal(false) }
        actionType='NEW_GROUP'
        loading={ isLoading && _.isEqual(dataType, 'new-group') }
      />
      )}

      {/* Users List */}
      <div ref={ userListRef } className='user-list'>
        {(!isLoading || offset !== 0 || !_.isEqual(dataType, 'chats-list')) && chatsList
        && chatsList.map((item, index) => (
          <div
            key={ item.id }
            className={ `user-card-root ${ conversationId === item.id ? 'selected' : '' }` }
            ref={ index === chatsList.length - 1 ? endRef : null }
          >
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
              handleOpenChat={ handleOpenChat }
            />
            {index !== chatsList.length - 1 ? <Divider className='user-list-divider' /> : ''}
          </div>
        ))}
        {isLoading && _.isEqual(dataType, 'chats-list') && <LeftSectionSkeleton />}
      </div>

      {!isLoading && chatsList && !chatsList.length && (
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
