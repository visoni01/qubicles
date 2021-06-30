import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ViewCourseReview from './viewCourseReview'

const ReviewsList = ({ reviews }) => (
  <div>
    {reviews && !_.isEmpty(reviews) && reviews.map((review) => (
      <ViewCourseReview
        key={ review.id }
        rating={ review.rating }
        comment={ review.comment }
        userName={ review.userName }
        userTitle={ review.userTitle }
        userPic={ review.userPic }
        dateOfReview={ review.dateOfReview }
        courseProgress={ review.courseProgress }
      />
    ))}
  </div>
)

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userTitle: PropTypes.string,
    userPic: PropTypes.string,
    dateOfReview: PropTypes.string.isRequired,
    courseProgress: PropTypes.number.isRequired,
  })).isRequired,
}

export default ReviewsList
