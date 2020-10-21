import React, { useState } from 'react'
import { Avatar, Button, Chip } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faMapMarkerAlt, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { talentCardValidator } from './talentValidators'

const TalentCard = ({
  candidateName, candidatePic, availability,
  candidateRating, location, languages,
  ratePerHourDollar, profileName,
  profileDescription, profileTags,
}) => {
  const [ showAllTags, setShowAllTags ] = useState(false)
  const [ visibleProfileTags, setVisibleProfileTags ] = useState(profileTags.filter((tag, index) => index < 3))

  return (
    <div className='talent-card'>
      <div className='display-inline-flex talent-head'>
        <Avatar alt={ candidateName } src={ candidatePic } />
        <div className='talent-details'>
          <div className='username'>
            <div className='display-inline-flex'>
              <h4>{candidateName}</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ candidateRating }
                precision={ 0.1 }
              />
              <FontAwesomeIcon className='badges' icon={ faAward } />
            </div>
            <Button className='text-button'>View Resume </Button>
          </div>
          <p className='location'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10' />
            {location}
            <span className='status'>
              {availability}
            </span>
          </p>
          <p className='languages'>
            <FontAwesomeIcon icon={ faLanguage } className='ml-10' />
            {languages}
            <span>
              {`${ ratePerHourDollar } $/hr`}
            </span>
          </p>
        </div>
      </div>
      <div className='talent-content'>
        <h4 className='mt-10'>
          {profileName}
        </h4>
        <p className='mt-10 mb-10'>
          {profileDescription}
        </p>
        <div className='talent-tags'>
          {visibleProfileTags.map((tag) => <Chip key={ tag } label={ tag } className='talent-chips mt-10' />)}

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

TalentCard.propTypes = talentCardValidator

export default TalentCard
