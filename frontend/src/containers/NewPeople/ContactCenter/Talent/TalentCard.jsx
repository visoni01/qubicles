import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faMapMarkerAlt, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { useHistory, Link } from 'react-router-dom'
import { terry } from '../../../../assets/images/avatar'
import ROUTE_PATHS from '../../../../routes/routesPath'

const TalentCard = ({
  candidateName, candidatePic, availability,
  candidateRating, location, languages,
  ratePerHourDollar, profileName,
  profileDescription, profileTags,
}) => {
  const history = useHistory()
  const [ showAllTags, setShowAllTags ] = useState(false)
  const [ visibleProfileTags, setVisibleProfileTags ] = useState(profileTags.filter((tag, index) => index < 3))

  return (
    <div className='talent-card list-divider'>
      <div className='display-inline-flex talent-head'>
        <Avatar alt={ candidateName } src={ candidatePic } />
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
              <FontAwesomeIcon className='badges ml-10' icon={ faAward } />
            </div>
            <Link
              to={ ROUTE_PATHS.VIEW_RESUME }
              className='primary-text-link  ml-10 mr-10'
            >
              View Resume
            </Link>
          </div>
          <p className='para light location'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10' />
            {location}
            <span className='ml-20 para italic'>
              {availability}
            </span>
          </p>
          <p className='para light languages'>
            <FontAwesomeIcon icon={ faLanguage } className='ml-10' />
            {languages}
            <span className='rate para'>
              {`${ ratePerHourDollar } $/hr`}
            </span>
          </p>
        </div>
      </div>
      <div className='talent-content'>
        <h4 className='mt-10 h4'>
          {profileName}
        </h4>
        <p className='mb-10 mt-5 para'>
          {profileDescription}
        </p>
        <div className='tags-set mt-10 mb-30'>
          {visibleProfileTags.map((tag) => <Chip key={ tag } label={ tag } className='tag-chip' />)}

          {!showAllTags && profileTags.length > 3 && (
            <Button
              className='more'
              onClick={ () => {
                setVisibleProfileTags(profileTags)
                setShowAllTags(true)
              } }
            >
              {`+${ profileTags.length - 3 } more`}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

TalentCard.defaultProps = {
  candidateName: 'Terry Garret',
  candidatePic: terry,
  availability: 'Available',
  candidateRating: 5,
  location: 'San Francisco, CA',
  languages: 'English, German',
  ratePerHourDollar: 12.50,
  profileName: 'Customer Service Expert',
  profileDescription: `I have over 15 years of experience in telemarketing and lead generation.
  I also have over 5 years of experience in management, quality control and supervision.
  I do have the ability and update your contact list in real time...`,
  profileTags: [ 'Customer Service', 'Phone Calling', 'Active Talker', 'Business Studies' ],
}

TalentCard.propTypes = {
  candidateName: PropTypes.string,
  candidatePic: PropTypes.string,
  availability: PropTypes.string,
  candidateRating: PropTypes.number,
  location: PropTypes.string,
  languages: PropTypes.string,
  ratePerHourDollar: PropTypes.number,
  profileName: PropTypes.string,
  profileDescription: PropTypes.string,
  profileTags: PropTypes.arrayOf(PropTypes.string),
}

export default TalentCard
