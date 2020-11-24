/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types'

const jobCategoryCardValidator = {
  categoryName: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
      required: PropTypes.number,
      hired: PropTypes.number,
      evaluating: PropTypes.number,
      pending: PropTypes.number,
    }),
  ),
}

export { jobCategoryCardValidator }
