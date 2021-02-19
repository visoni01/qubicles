import React from 'react'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import './styles.scss'

const Reviews = ({
  reviewText,
  rating,
  userDetails,
}) => (
  <>
    <div className='display-inline-flex pb-20 list-divider'>
      <Avatar className='profile-pic no-margin-top' alt={ userDetails.profileName } src={ userDetails.profilePic } />
      <div className='candidate-info'>
        <p className='para bold'>{userDetails.profileName}</p>
        <p className='para light'>{userDetails.profileTitle}</p>
        <Rating
          className='rating-star no-margin'
          name='read-only'
          readOnly
          size='small'
          value={ rating }
          precision={ 0.1 }
        />
        <p className='para mt-5'>
          {reviewText}
        </p>
      </div>
    </div>
  </>
)

Reviews.defaultProps = {
  reviewText: '',
  rating: 0,
  userDetails: {
    profileName: '',
    profilePic: '',
    profileTitle: '',
  },
}

Reviews.propTypes = {
  reviewText: PropTypes.string,
  rating: PropTypes.number,
  userDetails: PropTypes.shape({
    profileName: PropTypes.string,
    profilePic: PropTypes.string,
    profileTitle: PropTypes.string,
  }),
}

export default Reviews
