/* eslint-disable complexity */
import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AvatarGroup } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Box, Avatar, Button, IconButton, TextField, ClickAwayListener,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { LocationIcon } from '../../../assets/images/common'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../../routes/routesPath'
import ChatOptions from './chatOptions'
import ViewMembers from './viewMembers'
import RightSectionSkeleton from '../../../components/Chat/Skeletons/rightSectionSkeleton'

const RightCard = ({ changeGroupName }) => {
  const { initialFetchDone } = useSelector((state) => state.allChats)
  const { conversations, currentChatId } = useSelector((state) => state.chatData)

  const [ openViewMembersModal, setOpenViewMembersModal ] = useState(false)
  const [ showGroupNameField, setShowGroupNameField ] = useState(false)
  const [ groupNameValue, setGroupNameValue ] = useState('')

  const chatData = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
  const chat = chatData?.data
  const members = chat?.candidatesInfo
  const isGroup = chat?.isGroup
  const otherUser = members && members.length > 0 && members[ 0 ]

  useEffect(() => setGroupNameValue(chat?.groupName), [ chat ])

  useEffect(() => () => setShowGroupNameField(false), [ chatData ])

  const stripHtml = useCallback((html) => {
    const temporalDivElement = document.createElement('div')
    temporalDivElement.innerHTML = html
    return temporalDivElement.textContent || temporalDivElement.innerText || ''
  }, [])

  const handleEdit = useCallback(() => {
    setShowGroupNameField(true)
  }, [])

  const handleOnChange = useCallback((event) => {
    setGroupNameValue(event.target.value)
  }, [])

  const handleCheck = useCallback(() => {
    const newGroupName = stripHtml(groupNameValue && groupNameValue.trim())
    setGroupNameValue(newGroupName)
    setShowGroupNameField(false)
    changeGroupName({
      newGroupName,
      oldGroupName: chat && chat.groupName,
    })
  }, [ changeGroupName, groupNameValue, chat, stripHtml ])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') { handleCheck() }
  }, [ handleCheck ])

  const handleCancelEdit = useCallback(() => {
    setShowGroupNameField(false)
    setGroupNameValue(chat?.groupName)
  }, [ chat ])

  if (((_.isNull(chatData?.isLoading) || chatData?.isLoading) && _.isEqual(chatData?.dataType, 'current-chat'))
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
                    multiline
                    InputProps={ {
                      endAdornment: (
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
                  {!chat?.isRemoved && (
                    <IconButton
                      className='no-padding'
                      onClick={ handleEdit }
                    >
                      <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faPen } />
                    </IconButton>
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
          to={ `${ otherUser && otherUser.userCode === 'agent'
            ? PROFILE_ROUTE : COMPANY_PROFILE_ROUTE }/${ otherUser?.userCode === 'agent'
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
