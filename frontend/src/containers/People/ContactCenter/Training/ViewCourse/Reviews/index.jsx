import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, IconButton } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FilterIcon } from '../../../../../../assets/images/training'
import ViewAllRatings from '../../../../../Shared/viewAllRatings'
import courseRatingLabels from './ratingLabels'
import ReviewsList from './reviewsList'
import { courseRatingsFetchStart } from '../../../../../../redux-saga/redux/people'
import CourseRatingSkeleton from '../../Skeletons/courseRatingSkeleton'

const CourseReviews = ({ courseId }) => {
  const { ratings, addReviewAccess, loading } = useSelector((state) => state.courseRatings)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(courseRatingsFetchStart({ courseId }))
  }, [ dispatch, courseId ])

  return (
    <>
      <Box className='custom-box course-reviews-root'>
        <div className='heading-section'>
          <h3 className='h3'>Reviews</h3>
          <IconButton className='filter-icon' disabled={ loading || _.isNull(loading) }>
            <FilterIcon />
          </IconButton>
          {addReviewAccess && (
          <Button
            disabled={ loading || _.isNull(loading) }
            className='leave-review-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Leave Review
          </Button>
          )}
        </div>

        {(loading || _.isNull(loading)) && <CourseRatingSkeleton />}
        {!loading && (
        <ViewAllRatings
          subRatingLabels={ courseRatingLabels }
          subRatingValues={ {
            valueRating: ratings.value,
            clarityRating: ratings.clarity,
            contentRating: ratings.content,
            structureRating: ratings.structure,
          } }
          totalAverageRating={ ratings.totalAverageRating }
          totalAverageRaters={ ratings.totalAverageRaters }
        />
        )}

        <ReviewsList />

        <Pagination
          count={ 3 }
          shape='round'
          page={ 1 }
          onChange={ null }
          classes={ { root: 'courses-pagination' } }
          hidePrevButton={ 1 < 2 }
          hideNextButton={ 1 === 3 }
          className='is-flex is-center'
        />
      </Box>
    </>
  )
}

CourseReviews.propTypes = {
  courseId: PropTypes.number.isRequired,
}

export default CourseReviews
