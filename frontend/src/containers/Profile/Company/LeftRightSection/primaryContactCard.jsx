import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { terry } from '../../../../assets/images/avatar'

const PrimaryContactCard = ({
  candidateName,
  candidateRating,
  candidatePic,
  profileName,

}) => (
  <div className='top-talent list-divider'>
    <div className='display-inline-flex mb-10'>
      <Avatar className='profile-pic' alt={ candidateName } src={ candidatePic } />
      <div className='candidate-info'>
        <span className='h4'>{candidateName}</span>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='small'
          value={ candidateRating }
          precision={ 0.5 }
        />
        <p className='para light'>
          {profileName}
        </p>
        <span
          className='primary-text-link'
        >
          View Profile
        </span>
      </div>
    </div>
  </div>
)

PrimaryContactCard.defaultProps = {
  candidateName: 'Josh Starmer',
  candidateRating: '5',
  candidatePic: terry,
  profileName: 'Service Specialist',
}

PrimaryContactCard.propTypes = {
  candidateName: PropTypes.string,
  candidateRating: PropTypes.number,
  candidatePic: PropTypes.string,
  profileName: PropTypes.string,
}

export default PrimaryContactCard
