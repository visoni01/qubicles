import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Avatar, Button } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { LocationIcon } from '../../assets/images/common'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../routes/routesPath'
import ChatOptions from './chatOptions'

const RightCard = ({ members, isGroup }) => {
  const otherUser = members && members.length && members[ 0 ]

  return (
    <Box className='custom-box right-card'>

      {/* Chat Options */}
      <ChatOptions isGroup={ isGroup } />

      {/* Profile Pictures */}
      <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
        { members.length && members.map((member, index) => {
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
        {isGroup ? 'Group' : otherUser.name}
      </div>

      {/* User details or number of members */}
      <div>
        {isGroup ? (
          <div className='para'>
            { members.length }
            {' '}
            people in this conversation
          </div>
        ) : (
          <div className='text-center'>
            <div className='para mb-5 text-center'>{otherUser.title}</div>
            <div className='para light display-inline-flex align-items-center'>
              <LocationIcon className='mr-5' />
              {otherUser.location}
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
        >
          View Members
        </Button>
      ) : (
        <Link
          className='text-link'
          to={ `${ otherUser.userCode === 'agent' ? PROFILE_ROUTE : COMPANY_PROFILE_ROUTE }/${ otherUser.id }/feed` }
        >
          View Profile
        </Link>
      )}
    </Box>
  )
}

RightCard.defaultProps = {
  isGroup: false,
}

RightCard.propTypes = {
  isGroup: PropTypes.bool,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profilePic: PropTypes.string,
    location: PropTypes.string,
    title: PropTypes.string,
    userCode: PropTypes.string,
  })).isRequired,
}

export default RightCard
