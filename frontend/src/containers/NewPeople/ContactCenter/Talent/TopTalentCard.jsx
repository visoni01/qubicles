import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { terry } from '../../../../assets/images/avatar'
import ROUTE_PATHS from '../../../../routes/routesPath'

const TopTalentCard = ({
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
          precision={ 0.1 }
        />
        <p className='para light'>
          {profileName}
        </p>
        <Link
          to={ ROUTE_PATHS.VIEW_RESUME }
          className='primary-text-link'
        >
          View Resume
        </Link>
      </div>
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
