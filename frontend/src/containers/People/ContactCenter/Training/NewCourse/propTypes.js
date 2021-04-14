import PropTypes from 'prop-types'

export const testQuestionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  unitId: PropTypes.number.isRequired,
  questionType: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answerText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  isSaved: PropTypes.bool.isRequired,
  correctOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  correctOption: PropTypes.number.isRequired,
})

export const testType = {

}
