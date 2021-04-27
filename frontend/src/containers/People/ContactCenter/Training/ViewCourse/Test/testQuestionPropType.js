import PropTypes from 'prop-types'

export const testQuestionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  questionType: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
}).isRequired

export const testType = {

}
