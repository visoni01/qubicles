import React from 'react'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'

const ProfileReview = ({
  reviewText,
  rating,
  userDetails,
}) => (
  <>
    <div className='display-inline-flex list-divider no-margin pt-20 pb-10 is-fullwidth'>
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
          precision={ 0.5 }
        />
        <span className='ml-5 para bold primary'>{rating}</span>
        <p className='para mt-5'>
          {reviewText}
        </p>
      </div>
    </div>
  </>
)

ProfileReview.defaultProps = {
  reviewText: '',
  rating: 0,
  userDetails: {
    profileName: '',
    profilePic: '',
    profileTitle: '',
  },
}

ProfileReview.propTypes = {
  reviewText: PropTypes.string,
  rating: PropTypes.number,
  userDetails: PropTypes.shape({
    profileName: PropTypes.string,
    profilePic: PropTypes.string,
    profileTitle: PropTypes.string,
  }),
}

export default ProfileReview
