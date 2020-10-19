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

const topTalentCardValidator = {
  candidateName: PropTypes.string,
  candidateRating: PropTypes.number,
  candidatePic: PropTypes.object,
  profileName: PropTypes.string,
}

export { talentCardValidator, topTalentCardValidator }
