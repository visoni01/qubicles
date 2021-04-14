import React from 'react'
import { Avatar } from '@material-ui/core'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faMapMarkerAlt, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { terry } from '../../../../assets/images/avatar'
import { VIEW_RESUME_ROUTE } from '../../../../routes/routesPath'
import TalentCardSkills from './talentCardSkills'

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
              precision={ 0.1 }
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

TalentCard.defaultProps = {
  candidateName: 'Terry Garret',
  candidatePic: terry,
  availability: 'available',
  candidateRating: 5,
  location: 'San Francisco, CA',
  languages: 'english',
  ratePerHourDollar: 12.50,
  profileName: 'Customer Service Expert',
  profileDescription: `I have over 15 years of experience in telemarketing and lead generation.
  I also have over 5 years of experience in management, quality control and supervision.
  I do have the ability and update your contact list in real time...`,
  skills: [],
}

TalentCard.propTypes = {
  candidateId: PropTypes.number.isRequired,
  candidateName: PropTypes.string,
  candidatePic: PropTypes.string,
  availability: PropTypes.string,
  candidateRating: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.string,
  ratePerHourDollar: PropTypes.number,
  profileName: PropTypes.string,
  profileDescription: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.any),
}

export default TalentCard
