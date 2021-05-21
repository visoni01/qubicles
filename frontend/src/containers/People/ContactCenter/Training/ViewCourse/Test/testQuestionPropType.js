import PropTypes from 'prop-types'

const testQuestionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  questionType: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
})

export default testQuestionPropType
