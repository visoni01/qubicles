import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { useHistory, Link } from 'react-router-dom'
import { terry } from '../../../../assets/images/avatar'
import ROUTE_PATHS from '../../../../routes/routesPath'

const TopTalentCard = ({
  candidateName,
  candidateRating,
  candidatePic,
  profileName,

}) => {
  const history = useHistory()
  return (
    <div className='top-talent'>
      <div className='display-inline-flex talent-profile'>
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
}

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
