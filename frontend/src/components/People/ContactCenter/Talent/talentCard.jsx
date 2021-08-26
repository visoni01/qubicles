import React from 'react'
import { Avatar } from '@material-ui/core'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faMapMarkerAlt, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { VIEW_RESUME_ROUTE } from '../../../../routes/routesPath'
import TalentCardSkills from '../../../../containers/People/ContactCenter/Talent/talentCardSkills'

const TalentCard = ({
  candidateId, candidateName, candidatePic, availability,
  candidateRating, location, languages,
  ratePerHourDollar, profileName,
  profileDescription, skills,
}) => (
  <div className='list-divider mt-10 mb-20'>
    <div className='display-inline-flex talent-head'>
      <Avatar alt={ candidateName } src={ candidatePic } classes={ { root: 'avatar-lg' } } />
      <div className='talent-details'>
        <div className='username'>
          <div className='display-inline-flex'>
            <h4 className='h4'>{candidateName}</h4>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ candidateRating }
              precision={ 0.5 }
            />
            <FontAwesomeIcon className='ml-10 custom-fa-icon light sz-lg' icon={ faAward } />
          </div>
          <Link
            to={ `${ VIEW_RESUME_ROUTE }/${ candidateId }` }
            className='primary-text-link  ml-10 mr-10'
          >
            View Resume
          </Link>
        </div>
        <p className='para light location'>
          {location !== 'null, null' && (
          <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10 custom-fa-icon light' />
          )}
          { location !== 'null, null' && location }
          <span className='ml-20 para italic'>
            {_.startCase(_.toLower(availability))}
          </span>
        </p>
        <p className='para light languages'>
          <FontAwesomeIcon icon={ faLanguage } className='ml-10 custom-fa-icon light' />
          {_.capitalize(languages)}
          {ratePerHourDollar && (
          <span className='rate para bold'>
            {`$${ ratePerHourDollar }/hr`}
          </span>
          )}
        </p>
      </div>
    </div>
    <div className='talent-content'>
      {profileName && (
      <h4 className='mt-10 h4'>
        {profileName}
      </h4>
      )}
      {profileDescription && (
      <div className='mb-10 mt-5 para short-description'>
        {`${ profileDescription }`}
      </div>
      )}
    </div>
    <TalentCardSkills
      userSkills={ skills }
    />
  </div>
)

TalentCard.propTypes = {
  candidateId: PropTypes.number.isRequired,
  candidateName: PropTypes.string.isRequired,
  candidatePic: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  candidateRating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  languages: PropTypes.string.isRequired,
  ratePerHourDollar: PropTypes.number.isRequired,
  profileName: PropTypes.string.isRequired,
  profileDescription: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      skillId: PropTypes.number,
      skillName: PropTypes.string,
      endorsedCount: PropTypes.number,
    }),
  ).isRequired,
}

export default TalentCard
