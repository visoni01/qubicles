import React from 'react'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'

const ViewCourseReview = ({
  rating, comment, userName, userTitle, userPic, dateOfReveiew, courseProgress,
}) => (
  <>
    <div className='user-review list-divider'>
      <Avatar className='profile-pic mr-20 no-margin-top' alt={ userName } src={ userPic } />
      <div className='is-fullwidth'>
        <div className='display-inline-flex is-fullwidth justify-between'>
          <h4 className='h4'>{userName}</h4>
          <div className='ml-5 para light'>{`Course Completion ${ courseProgress }%`}</div>
        </div>
        <p className='para light mb-5'>{userTitle}</p>
        <Rating
          className='rating-star no-margin'
          name='read-only'
          readOnly
          size='small'
          value={ Number(rating) }
          precision={ 0.5 }
        />
        <span className='ml-10 para light'>{dateOfReveiew}</span>
        <p className='para mt-5'>
          {comment}
        </p>
      </div>
    </div>
  </>
)

ViewCourseReview.propTypes = {
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userTitle: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  dateOfReveiew: PropTypes.string.isRequired,
  courseProgress: PropTypes.number.isRequired,
}

export default ViewCourseReview
