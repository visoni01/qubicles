import PropTypes from 'prop-types'

export const chatsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    messageId: PropTypes.number,
    senderId: PropTypes.number,
    profilePic: PropTypes.string,
    isNotification: PropTypes.bool,
    imageUrl: PropTypes.string,
    text: PropTypes.string,
    sentAt: PropTypes.string,
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
    location: PropTypes.string,
    name: PropTypes.string,
    profilePic: PropTypes.string,
    title: PropTypes.string,
    userCode: PropTypes.string,
  }),
)
