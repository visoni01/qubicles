/* eslint-disable complexity */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Avatar, Button } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import { LocationIcon } from '../../../assets/images/common'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../../routes/routesPath'
import ChatOptions from './chatOptions'
import ViewMembers from './viewMembers'

const RightCard = () => {
  const [ openViewMembersModal, setOpenViewMembersModal ] = useState(false)
  const { chat } = useSelector((state) => state.currentChat)
  const { candidatesInfo: members, isGroup } = chat
  const otherUser = members && members.length && members[ 0 ]

  return (
    <Box className='custom-box right-card'>

      {/* Chat Options */}
      <ChatOptions isGroup={ isGroup } />

      {/* Profile Pictures */}
      <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
        { members && members.length && members.map((member, index) => {
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
      <div className='h4'>
        {isGroup ? 'Group' : otherUser && otherUser.name}
      </div>

      {/* User details or number of members */}
      <div>
        {isGroup ? (
          <div className='para'>
            {`${ members.length } people in this conversation`}
          </div>
        ) : (
          <div className='text-center'>
            <div className='para mb-5 text-center'>{otherUser && otherUser.title}</div>
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
          target='_blank'
        >
          View Profile
        </Link>
      )}

      {/* View Members Modal */}
      <ViewMembers
        open={ openViewMembersModal }
        handleClose={ () => setOpenViewMembersModal(false) }
      />
    </Box>
  )
}

export default RightCard
