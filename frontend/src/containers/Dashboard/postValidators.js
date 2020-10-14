import PropTypes from 'prop-types'

const commentValidator = PropTypes.shape({
  user_activity_id: PropTypes.number.isRequired,
  owner_id: PropTypes.number.isRequired,
  activity_value: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
})

const commentsArrayValidator = PropTypes.arrayOf(
  commentValidator,
)

export { commentValidator, commentsArrayValidator }
