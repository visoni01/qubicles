import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'

const CompaniesSuggestionsCard = ({
  companyName,
  companyRating,
}) => (
  <div className='suggested-company list-divider'>
    <div className='display-inline-flex mb-10'>
      <Avatar className='profile-pic' alt={ companyName } src={ companyName[ 0 ].toUpperCase() } />
      <div className='candidate-info'>
        <span className='h4'>{companyName}</span>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='small'
          value={ companyRating }
          precision={ 0.5 }
        />
        <span
          className='primary-text-link'
        >
          View Profile
        </span>
      </div>
    </div>
  </div>
)

CompaniesSuggestionsCard.propTypes = {
  companyName: PropTypes.string.isRequired,
  companyRating: PropTypes.number.isRequired,
}

export default CompaniesSuggestionsCard
