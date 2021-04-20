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
    <div className='profile-review list-divider no-margin'>
      <Avatar className='profile-pic no-margin-top' alt={ userDetails.profileName } src={ userDetails.profilePic } />
      <div className='candidate-info'>
        <h4 className='h4'>{userDetails.profileName}</h4>
        <p className='para light'>{userDetails.profileTitle}</p>
        <Rating
          className='rating-star no-margin'
          name='read-only'
          readOnly
          size='small'
          value={ Number(rating) }
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
  rating: PropTypes.string,
  userDetails: PropTypes.shape({
    profileName: PropTypes.string,
    profilePic: PropTypes.string,
    profileTitle: PropTypes.string,
  }),
}

export default ProfileReview
