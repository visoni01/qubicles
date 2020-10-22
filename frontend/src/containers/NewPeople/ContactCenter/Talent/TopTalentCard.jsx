import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { terry } from '../../../../assets/images/avatar'

const TopTalentCard = ({
  candidateName,
  candidateRating,
  candidatePic,
  profileName,

}) => (
  <div className='display-inline-flex top-talent'>
    <Avatar className='profile-pic' alt={ candidateName } src={ candidatePic } />
    <div className='candidate-info'>
      <span className='candidate-name'>{candidateName}</span>
      <Rating
        className='rating-star'
        name='read-only'
        readOnly
        size='small'
        value={ candidateRating }
        precision={ 0.1 }
      />
      <p className='description'>
        {profileName}
      </p>
      <Button className='text-button'>View Resume </Button>
    </div>
  </div>
)

TopTalentCard.defaultProps = {
  candidateName: 'Josh Starmer',
  candidateRating: '5',
  candidatePic: terry,
  profileName: 'Service Specialist',
}

TopTalentCard.propTypes = {
  candidateName: PropTypes.string,
  candidateRating: PropTypes.number,
  candidatePic: PropTypes.string,
  profileName: PropTypes.string,
}

export default TopTalentCard
