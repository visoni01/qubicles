import PropTypes from 'prop-types'

const assessmentTestPropType = PropTypes.arrayOf(PropTypes.shape({
  sectionId: PropTypes.number,
  title: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    questionText: PropTypes.string,
    questionType: PropTypes.string,
    dateTime: PropTypes.shape({
      isDate: PropTypes.bool,
      isTime: PropTypes.bool,
    }),
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })),
    scale: PropTypes.shape({
      minRange: PropTypes.string,
      maxRange: PropTypes.string,
    }),
  })),
}))

export default assessmentTestPropType
