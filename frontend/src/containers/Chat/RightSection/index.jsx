/* eslint-disable complexity */
import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AvatarGroup } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Box, Avatar, Button, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { LocationIcon } from '../../../assets/images/common'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../../routes/routesPath'
import ChatOptions from './chatOptions'
import ViewMembers from './viewMembers'

const RightCard = ({ changeGroupName }) => {
  const { chat } = useSelector((state) => state.currentChat)

  const [ openViewMembersModal, setOpenViewMembersModal ] = useState(false)
  const [ showGroupNameField, setShowGroupNameField ] = useState(false)
  const [ groupNameValue, setGroupNameValue ] = useState('')

  const { candidatesInfo: members, isGroup } = chat
  const otherUser = members && members.length > 0 && members[ 0 ]

  useEffect(() => setGroupNameValue(chat.groupName), [ chat ])

  const handleEdit = useCallback(() => {
    setShowGroupNameField(true)
  }, [])

  const handleOnChange = useCallback((event) => {
    setGroupNameValue(event.target.value)
  }, [])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      setShowGroupNameField(false)
      changeGroupName(groupNameValue)
    }
  }, [ changeGroupName, groupNameValue ])

  return (
    <Box className='custom-box right-card'>

      {/* Chat Options */}
      <ChatOptions isGroup={ isGroup } conversationId={ chat.conversationId } />

      {/* Profile Pictures */}
      <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
        { members && members.length > 0 && members.map((member, index) => {
          if (index < 3) {
            return (
              <Avatar
                className='avatar'
                key={ member.candidateId }
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
                <TextField
                  value={ groupNameValue }
                  onChange={ handleOnChange }
                  onKeyDown={ handleKeyDown }
                  multiline
                />
              )
              : (
                <>
                  <div className='h4 sz-xl mr-10 short-message'>
                    {groupNameValue}
                  </div>
                  <IconButton
                    className='no-padding'
                    onClick={ handleEdit }
                  >
                    <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faPen } />
                  </IconButton>
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
            <div className='para light display-inline-flex align-items-center'>
              <LocationIcon className='mr-5' />
              {otherUser && otherUser.location}
            </div>
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
            ? PROFILE_ROUTE : COMPANY_PROFILE_ROUTE }/${ otherUser && otherUser.id }/feed` }
        >
          View Profile
        </Link>
      )}

      {/* View Members Modal */}
      <ViewMembers
        open={ openViewMembersModal }
        handleClose={ () => setOpenViewMembersModal(false) }
        members={ members }
        conversationId={ chat.conversationId }
      />
    </Box>
  )
}

RightCard.propTypes = {
  changeGroupName: PropTypes.func.isRequired,
}

export default RightCard
