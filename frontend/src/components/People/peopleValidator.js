import PropTypes from 'prop-types'

export const jobSubDetailsValidator = PropTypes.shape({
  jobId: PropTypes.number.isRequired,
  notifications: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noOfApplications: PropTypes.number.isRequired,
}).isRequired

export const jobCategoryValidator = PropTypes.shape({
  categoryId: PropTypes.number.isRequired,
  categoryTitle: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(jobSubDetailsValidator).isRequired,
}).isRequired
