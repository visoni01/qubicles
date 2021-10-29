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
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchIcon } from '../../../assets/images/common'
import UserCard from './userCard'
import NewChat from '../Common/addPeople'
import { allChatsRequestStart, chatDataRequestStart, updateCurrentChatId } from '../../../redux-saga/redux/chat'
import { NewChatIcon, NewGroupIcon } from '../../../assets/images/chat'
import LeftSectionSkeleton from '../../../components/Chat/Skeletons/leftSectionSkeleton'
import '../styles.scss'
import { REQUEST_TYPES } from '../../../utils/constants'
import {
  CHATS_LIST, MARK_AS_READ, NEW_CHAT, NEW_GROUP,
} from '../../../redux-saga/redux/constants'

const LeftCard = ({ conversationId }) => {
  const {
    chatsList, isLoading, offset, more, searchKeyword, dataType, success,
  } = useSelector((state) => state.allChats)

  const [ openSearchField, setOpenSearchField ] = useState(false)
  const [ openNewChatModal, setOpenNewChatModal ] = useState(false)
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)
  const [ searchUserField, setSearchUserField ] = useState('')

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
          requestType: REQUEST_TYPES.UPDATE,
          dataType: MARK_AS_READ,
          conversationId,
        }))
      }
      dispatch(updateCurrentChatId({ conversationId: id }))
    }
  }, [ dispatch, chatsList, conversationId ])

  // Search Conversations
  const searchConversations = useCallback(debounce((nextValue) => {
    dispatch(allChatsRequestStart({
      requestType: REQUEST_TYPES.FETCH,
      dataType: CHATS_LIST,
      searchKeyword: nextValue,
      offset: 0,
    }))
  }, 500), [ dispatch ])

  useEffect(() => {
    if (_.isNull(isLoading)) {
      dispatch(allChatsRequestStart({
        requestType: REQUEST_TYPES.FETCH,
        dataType: CHATS_LIST,
        offset: 0,
        searchKeyword: '',
      }))
    }
  }, [ dispatch, isLoading ])

  const handleObserver = useCallback((entries) => {
    const target = entries[ 0 ]
    if (target?.isIntersecting && more) {
      dispatch(allChatsRequestStart({
        requestType: REQUEST_TYPES.FETCH,
        dataType: CHATS_LIST,
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

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchUserField(nextValue)
    searchConversations(nextValue)
  }, [ searchConversations ])

  const handleCloseSearch = useCallback(() => {
    if (!_.isEmpty(searchUserField)) { searchConversations('') }
    setSearchUserField('')
    setOpenSearchField(false)
  }, [ searchUserField, searchConversations ])

  useEffect(() => {
    if (!isLoading && success && [ NEW_CHAT, NEW_GROUP ].includes(dataType)) {
      if (_.isEqual(dataType, NEW_CHAT)) {
        setOpenNewChatModal(false)
      } else if (_.isEqual(dataType, NEW_GROUP)) {
        setOpenNewGroupModal(false)
      }
    }
  }, [ isLoading, success, dataType ])

  useEffect(() => {
    if (openSearchField) {
      document.getElementById('search').focus()
      document.getElementById('search').select()
    }
  }, [ openSearchField ])

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
          id='search'
          className='search-field'
          value={ searchUserField }
          onChange={ handleSearch }
          placeholder='Search...'
          margin='dense'
          variant='outlined'
          InputProps={ {
            endAdornment: (
              <IconButton
                onClick={ handleCloseSearch }
                className='no-padding check-button'
              >
                <FontAwesomeIcon
                  icon={ faTimesCircle }
                  className='custom-fa-icon sz-md'
                />
              </IconButton>
            ),
          } }
        />
      )}

      {/* New Chat Modal */}
      {openNewChatModal && (
        <NewChat
          open={ openNewChatModal }
          handleCancel={ () => setOpenNewChatModal(false) }
          actionType={ NEW_CHAT }
          loading={ isLoading && _.isEqual(dataType, NEW_CHAT) }
        />
      )}

      {/* New Group Modal */}
      {openNewGroupModal && (
        <NewChat
          open={ openNewGroupModal }
          handleCancel={ () => setOpenNewGroupModal(false) }
          actionType={ NEW_GROUP }
          loading={ isLoading && _.isEqual(dataType, NEW_GROUP) }
        />
      )}

      {/* Users List */}
      <div ref={ userListRef } className='user-list'>
        {(!isLoading || offset !== 0 || !_.isEqual(dataType, CHATS_LIST)) && chatsList
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
              error={ item.error }
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
