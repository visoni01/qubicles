/* eslint-disable complexity */
import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AvatarGroup } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Box, Avatar, Button, IconButton, TextField, ClickAwayListener, CircularProgress,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { LocationIcon } from '../../../assets/images/common'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../../routes/routesPath'
import ChatOptions from './chatOptions'
import ViewMembers from './viewMembers'
import RightSectionSkeleton from '../../../components/Chat/Skeletons/rightSectionSkeleton'
import { stopLoader } from '../../../redux-saga/redux/utils'
import { CHANGE_GROUP_NAME, CURRENT_CHAT, DELETE_CHAT } from '../../../redux-saga/redux/constants'
import { USERS } from '../../../utils/constants'

const RightCard = ({ changeGroupName }) => {
  const [ openViewMembersModal, setOpenViewMembersModal ] = useState(false)
  const [ showGroupNameField, setShowGroupNameField ] = useState(false)
  const [ groupNameValue, setGroupNameValue ] = useState('')

  const { initialFetchDone } = useSelector((state) => state.allChats)
  const { conversations, currentChatId } = useSelector((state) => state.chatData)

  const dispatch = useDispatch()

  const chatData = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
  const chat = chatData?.data
  const members = chat?.candidatesInfo
  const isGroup = chat?.isGroup
  const otherUser = members && members.length > 0 && members[ 0 ]
  const isGroupLoading = chatData?.isLoading && _.isEqual(chatData?.dataType, CHANGE_GROUP_NAME)

  useEffect(() => setGroupNameValue(chat?.groupName), [ chat ])

  useEffect(() => {
    if (!(chatData?.isLoading && _.isEqual(chatData?.dataType, CHANGE_GROUP_NAME))) {
      setShowGroupNameField(false)
    }
  }, [ chatData ])

  const stripHtml = useCallback((html) => {
    const temporalDivElement = document.createElement('div')
    temporalDivElement.innerHTML = html
    return temporalDivElement.textContent || temporalDivElement.innerText || ''
  }, [])

  useEffect(() => {
    if (!chatData?.isLoading && chatData?.success && _.isEqual(chatData?.dataType, DELETE_CHAT)) {
      dispatch(stopLoader())
    }
  }, [ chatData, dispatch ])

  const handleEdit = useCallback(() => setShowGroupNameField(true), [])

  const handleOnChange = useCallback((event) => setGroupNameValue(event.target.value), [])

  const handleCheck = useCallback(() => {
    const newGroupName = stripHtml(groupNameValue?.trim())
    const oldGroupName = stripHtml(chat?.groupName)

    if (_.isEqual(newGroupName, oldGroupName)) {
      setShowGroupNameField(false)
    } else {
      changeGroupName({ newGroupName, oldGroupName })
    }
  }, [ changeGroupName, groupNameValue, chat, stripHtml ])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') { handleCheck() }
  }, [ handleCheck ])

  const handleCancelEdit = useCallback(() => {
    setShowGroupNameField(false)
    setGroupNameValue(chat?.groupName)
  }, [ chat ])

  if (((_.isNull(chatData?.isLoading) || chatData?.isLoading) && _.isEqual(chatData?.dataType, CURRENT_CHAT))
    || (!initialFetchDone)) {
    return (
      <RightSectionSkeleton />
    )
  }

  return (
    <Box className='custom-box right-card'>

      {/* Chat Options */}
      {chat && ((isGroup && !(chat.isRemoved && !chat.chatData?.chats?.length))
        || (!isGroup && !(!chat.allRead && !chat.chatData?.chats?.length))) && (
        <ChatOptions
          isGroup={ isGroup }
          conversationId={ chat?.conversationId }
          isRemoved={ chat?.isRemoved }
          isAllRead={ chat?.allRead }
          isEmpty={ !!chat?.chatData?.chats?.length }
        />
      )}

      {/* Profile Pictures */}
      <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
        { members && members.length > 0 && members.map((member, index) => {
          if (index < 3) {
            return (
              <Avatar
                className='avatar'
                key={ member.id }
                alt={ member.name }
                src={ member.profilePic }
              />
            )
          } return null
        })}
      </AvatarGroup>

      {/* User name or Group */}
      {isGroup
        ? (
          <div className='is-flex align-items-start mt-10 group-field'>
            {showGroupNameField
              ? (
                <ClickAwayListener onClickAway={ handleCancelEdit }>
                  <TextField
                    value={ groupNameValue }
                    onChange={ handleOnChange }
                    onKeyDown={ handleKeyDown }
                    disabled={ isGroupLoading }
                    multiline
                    InputProps={ {
                      endAdornment: (
                        <>
                          {isGroupLoading && (
                            <CircularProgress
                              size={ 15 }
                              className='group-name-loader'
                            />
                          )}

                          {!isGroupLoading && (
                            <>
                              <IconButton
                                onClick={ handleCheck }
                                className='no-padding check-button'
                              >
                                <FontAwesomeIcon
                                  icon={ faCheck }
                                  className='custom-fa-icon sz-md'
                                />
                              </IconButton>
                              <IconButton
                                onClick={ handleCancelEdit }
                                className='no-padding'
                              >
                                <FontAwesomeIcon
                                  icon={ faTimesCircle }
                                  className='custom-fa-icon sz-md'
                                />
                              </IconButton>
                            </>
                          )}
                        </>
                      ),
                    } }
                  />
                </ClickAwayListener>
              )
              : (
                <>
                  <div className='h4 sz-xl mr-10 short-message'>
                    {groupNameValue || members.map((member) => member.name).join(', ')}
                  </div>

                  {!chat?.isRemoved && !isGroupLoading && (
                    <IconButton
                      className='no-padding'
                      onClick={ handleEdit }
                    >
                      <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faPen } />
                    </IconButton>
                  )}

                  {isGroupLoading && (
                    <CircularProgress size={ 15 } />
                  )}
                </>
              )}
          </div>
        )
        : (
          <div className='h4 sz-xl mt-10 short-message'>
            {otherUser && otherUser.name}
          </div>
        )}

      {/* User details or number of members */}
      <div>
        {isGroup ? (
          <div className='para'>
            {`${ members.length } people in this conversation`}
          </div>
        ) : (
          <div className='text-center'>
            <div className='para sz-lg mb-5 text-center'>{otherUser && otherUser.title}</div>
            {otherUser?.location && (
              <div className='para light display-inline-flex align-items-center'>
                <LocationIcon className='mr-5' />
                {otherUser && otherUser.location}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Button or Link */}
      {isGroup ? (
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
          onClick={ () => setOpenViewMembersModal(true) }
        >
          View Members
        </Button>
      ) : (
        <Link
          className='text-link'
          to={ `${ otherUser && otherUser.userCode === USERS.AGENT
            ? PROFILE_ROUTE : COMPANY_PROFILE_ROUTE }/${ otherUser?.userCode === USERS.AGENT
              ? otherUser?.id : otherUser?.clientId }/feed` }
          target='_blank'
        >
          View Profile
        </Link>
      )}

      {/* View Members Modal */}
      {openViewMembersModal && (
        <ViewMembers
          open={ openViewMembersModal }
          handleClose={ () => setOpenViewMembersModal(false) }
          members={ members }
          conversationId={ chat?.conversationId }
          isRemoved={ chat?.isRemoved }
        />
      )}
    </Box>
  )
}

RightCard.propTypes = {
  changeGroupName: PropTypes.func.isRequired,
}

export default RightCard
