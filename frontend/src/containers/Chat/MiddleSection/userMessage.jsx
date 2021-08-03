import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { Avatar } from '@material-ui/core'
import { formatDate } from '../../../utils/common'

const UserMessage = ({
  candidateId, message, profilePic, sentAt,
}) => {
  const { userDetails } = useSelector((state) => state.login)

  return (
    <>
      {userDetails && _.isEqual(candidateId, userDetails.user_id)
        ? (
          <div className='is-flex is-end align-items-start'>
            <div className='mr-15 mb-15 text-message'>
              <p className='para text-message-body self-message'>{ message }</p>
              <p className='para light mt-10 text-align-end'>{ sentAt && formatDate(sentAt, 'hh:mm a') }</p>
            </div>
            <Avatar
              src={ profilePic }
              className='profile-picture'
            />
          </div>
        )
        : (
          <div className='is-flex align-items-start'>
            <Avatar
              src={ profilePic }
              className='profile-picture'
            />
            <div className='ml-15 mb-15 text-message'>
              <p className='para text-message-body other-user-message'>{ message }</p>
              <p className='para light mt-10'>{ sentAt && formatDate(sentAt, 'hh:mm a') }</p>
            </div>
          </div>
        )}
    </>
  )
}

UserMessage.propTypes = {
  candidateId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
}

export default UserMessage
