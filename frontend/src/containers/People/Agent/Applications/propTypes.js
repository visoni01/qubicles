import PropTypes from 'prop-types'

export const applicationPropTypes = PropTypes.shape({
  applicationId: PropTypes.number.isRequired,
  agentUserId: PropTypes.number.isRequired,
  clientId: PropTypes.number.isRequired,
  jobId: PropTypes.number.isRequired,
  coverLetter: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  updateOn: PropTypes.string.isRequired,
})

export const jobDetailsPropTypes = PropTypes.shape({
  jobId: PropTypes.number.isRequired,
  jobType: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  durationType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  fulfilled: PropTypes.number.isRequired,
  needed: PropTypes.number.isRequired,
  durationMonths: PropTypes.number.isRequired,
  payAmount: PropTypes.number.isRequired,
})

export const clientDetailsPropTypes = PropTypes.shape({
  clientId: PropTypes.number.isRequired,
  clientName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
})
