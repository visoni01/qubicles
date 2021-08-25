/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable complexity */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { Avatar } from '@material-ui/core'
import { formatDate } from '../../../utils/common'
import ImagePreview from '../../../components/CommonModal/imagePreview'

const UserMessage = ({
  senderId, message, profilePic, imageUrl, sentAt,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const [ openImagePreview, setOpenImagePreview ] = useState(false)

  return (
    <>
      <div
        className={ `is-flex align-items-start
          ${ userDetails && _.isEqual(senderId, userDetails.user_id) && 'is-end' }` }
      >
        {/* Profile Picture for Other User Message */}
        {(userDetails && _.isEqual(senderId, userDetails.user_id)) || (
          <Avatar
            src={ profilePic }
            className='profile-picture'
          />
        )}

        {/* Message Body */}
        <div className='ml-15 mr-15 mb-15 text-message'>
          <div
            className={ `${ _.isEmpty(message) ? 'image-body' : 'text-message-body' }
            ${ userDetails && _.isEqual(senderId, userDetails.user_id) ? 'self-message' : 'other-user-message' }` }
          >
            {imageUrl && (
              <img
                alt={ message }
                src={ imageUrl }
                onClick={ () => setOpenImagePreview(true) }
              />
            )}
            <p className='para'>{ message }</p>
          </div>

          <p
            className={ `para light mt-10
              ${ (userDetails && _.isEqual(senderId, userDetails.user_id)) && 'text-align-end' }` }
          >
            { sentAt && formatDate(sentAt, 'hh:mm a') }
          </p>
        </div>

        {/* Profile Picture for Self message */}
        {userDetails && _.isEqual(senderId, userDetails.user_id) && (
          <Avatar
            src={ profilePic }
            className='profile-picture'
          />
        )}
      </div>

      {openImagePreview && (
        <ImagePreview
          open={ openImagePreview }
          handleClose={ () => setOpenImagePreview(false) }
          imageUrl={ imageUrl }
        />
      )}
    </>
  )
}

UserMessage.defaultProps = {
  imageUrl: '',
}

UserMessage.propTypes = {
  senderId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  sentAt: PropTypes.string.isRequired,
}

export default UserMessage
