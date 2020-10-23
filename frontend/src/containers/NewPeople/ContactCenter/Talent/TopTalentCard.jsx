import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { topTalentCardValidator } from './talentValidators'

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

TopTalentCard.propTypes = topTalentCardValidator

export default TopTalentCard
