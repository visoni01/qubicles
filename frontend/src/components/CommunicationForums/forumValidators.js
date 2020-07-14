import PropTypes from 'prop-types'

export const ownerDetails = PropTypes.shape({
  profileImage: PropTypes.string,
  userId: PropTypes.number,
  userName: PropTypes.string,
})

export const dateWithUser = PropTypes.shape({
  date: PropTypes.string,
  ownerDetails,
})

export const postShape = PropTypes.shape({
  postMeta: PropTypes.shape({
    ownerDetails,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    totalReplies: PropTypes.number.isRequired,
  }),
  postBody: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }),
})

export const TopicItemShape = PropTypes.shape({
  dateCreatedOn: PropTypes.string.isRequired,
  dateLastReplied: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  topicId: PropTypes.number.isRequired,
  topicOwner: ownerDetails.isRequired,
  topicTitle: PropTypes.string.isRequired,
  totalReplies: PropTypes.number.isRequired,
})
