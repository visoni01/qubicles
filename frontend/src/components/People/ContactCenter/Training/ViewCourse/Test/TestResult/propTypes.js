import PropTypes from 'prop-types'

const optionPropType = PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])

const optionsPropType = PropTypes.arrayOf(PropTypes.shape({
  id: optionPropType.isRequired,
  value: PropTypes.string.isRequired,
}))

const scalePropType = PropTypes.shape({
  minRange: PropTypes.number,
  maxRange: PropTypes.number,
})

const testQuestionWithResultPropType = PropTypes.shape({
  id: optionPropType.isRequired,
  questionType: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answerText: PropTypes.string,
  options: optionsPropType,
  correctOptions: PropTypes.arrayOf(optionPropType),
  correctOption: optionPropType,
  dateTime: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    isDate: PropTypes.bool,
    isTime: PropTypes.bool,
  }),
  userAnswer: PropTypes.string,
  userOptions: PropTypes.arrayOf(optionPropType),
  isCorrect: PropTypes.bool.isRequired,
  scale: scalePropType,
})

// eslint-disable-next-line import/prefer-default-export
export {
  testQuestionWithResultPropType, optionsPropType, optionPropType, scalePropType,
}
