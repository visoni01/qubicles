import PropTypes from 'prop-types'

const errorsPropTypes = PropTypes.shape({
  category: PropTypes.shape({
    message: PropTypes.string,
  }),
  needed: PropTypes.shape({
    message: PropTypes.string,
  }),
  title: PropTypes.shape({
    message: PropTypes.string,
  }),
  description: PropTypes.shape({
    message: PropTypes.string,
  }),
  payAmount: PropTypes.shape({
    message: PropTypes.string,
  }),
  durationMonths: PropTypes.shape({
    message: PropTypes.string,
  }),
  requiredSkills: PropTypes.shape({
    message: PropTypes.string,
  }),
  requiredCourses: PropTypes.shape({
    message: PropTypes.string,
  }),
})

export default errorsPropTypes
