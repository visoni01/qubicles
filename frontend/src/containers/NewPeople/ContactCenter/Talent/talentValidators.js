import PropTypes from 'prop-types'

const talentCardValidator = {
  candidateName: PropTypes.string,
  availability: PropTypes.string,
  candidateRating: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.string,
  ratePerHourDollar: PropTypes.number,
  profileName: PropTypes.string,
  profileDescription: PropTypes.string,
  profileTags: PropTypes.arrayOf(PropTypes.string),
}

export { talentCardValidator }
