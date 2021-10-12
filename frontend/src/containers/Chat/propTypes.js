import PropTypes from 'prop-types'

export const chatsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    messageId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    senderId: PropTypes.number,
    profilePic: PropTypes.string,
    senderName: PropTypes.string,
    isNotification: PropTypes.bool,
    imageUrl: PropTypes.string,
    text: PropTypes.string,
    sentAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isRead: PropTypes.bool,
  }),
)

export const chatDataPropTypes = PropTypes.shape({
  chats: chatsPropTypes,
  more: PropTypes.bool,
  offset: PropTypes.number,
})

export const groupMembersPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    clientId: PropTypes.number,
    location: PropTypes.string,
    name: PropTypes.string,
    profilePic: PropTypes.string,
    title: PropTypes.string,
    userCode: PropTypes.string,
  }),
)

export const activeUsersPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
)
