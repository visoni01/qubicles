import PropTypes from 'prop-types'

const testQuestionPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
})

export default testQuestionPropType
