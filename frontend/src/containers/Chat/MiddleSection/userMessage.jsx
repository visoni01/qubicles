/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { Avatar, IconButton } from '@material-ui/core'
import { formatDate } from '../../../utils/common'
import ImagePreview from '../../../components/CommonModal/imagePreview'
import ProfilePreview from '../../../components/Chat/profilePreview'

const UserMessage = ({
  senderId, message, profilePic, senderName, imageUrl, sentAt,
}) => {
  const { userDetails } = useSelector((state) => state.login)

  const [ openImagePreview, setOpenImagePreview ] = useState(false)
  const [ openProfilePreview, setOpenProfilePreview ] = useState(false)
  const [ isSelfMessage, setIsSelfMessage ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleOpen = useCallback((event, self) => {
    setOpenProfilePreview(true)
    setAnchorEl(event.currentTarget)
    setIsSelfMessage(!!self)
  }, [])

  const handleClose = useCallback(() => {
    setOpenProfilePreview(false)
    setAnchorEl(null)
  }, [])

  return (
    <>
      <div
        className={ `is-flex align-items-start
          ${ userDetails && _.isEqual(senderId, userDetails.user_id) && 'is-end' }` }
      >
        {/* Profile Picture for Other User Message */}
        {(userDetails && _.isEqual(senderId, userDetails.user_id)) || (
          <IconButton
            className='no-padding'
            onClick={ handleOpen }
          >
            <Avatar
              src={ profilePic }
              className='profile-picture'
            />
          </IconButton>
        )}

        {/* Message Body */}
        <div className='ml-15 mr-15 mb-15 text-message'>
          <div
            className={ `${ _.isEmpty(message) ? 'image-body' : 'text-message-body' }
            ${ userDetails && _.isEqual(senderId, userDetails.user_id) ? 'self-message' : 'other-user-message' }` }
          >
            {imageUrl && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
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
          <IconButton
            className='no-padding'
            onClick={ (e) => handleOpen(e, true) }
          >
            <Avatar
              src={ profilePic }
              className='profile-picture'
            />
          </IconButton>
        )}
      </div>

      {openImagePreview && (
        <ImagePreview
          open={ openImagePreview }
          handleClose={ () => setOpenImagePreview(false) }
          imageUrl={ imageUrl }
        />
      )}

      {openProfilePreview && (
        <ProfilePreview
          open={ openProfilePreview }
          anchorEl={ anchorEl }
          handleClose={ handleClose }
          profilePic={ profilePic }
          name={ senderName }
          selfMessage={ isSelfMessage }
        />
      )}
    </>
  )
}

UserMessage.defaultProps = {
  profilePic: '',
  imageUrl: '',
}

UserMessage.propTypes = {
  senderId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  senderName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  sentAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

export default UserMessage
