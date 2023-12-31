/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box, Button, Divider, IconButton,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FilterIcon } from '../../../../../../assets/images/training'
import ViewAllRatings from '../../../../../../components/CommonModal/viewAllRatings'
import courseRatingLabels from './ratingLabels'
import ReviewsList from '../../../../../../components/People/ContactCenter/Training/ViewCourse/Reviews/reviewsList'
import {
  courseRatingsFetchStart, courseReviewsRequestStart, resetCourseReviewsReducer, updateCourseReviewsFilterOrPage,
} from '../../../../../../redux-saga/redux/people'
import CourseRatingSkeleton from
  '../../../../../../components/People/ContactCenter/SkeletonLoader/Training/ratingSkeleton'
import AddCourseReview from './addCourseReview'
import CourseReviewsFilterModal from './courseReviewsFilterModal'
import { courseReviewsFilterStatus, noOfReviewsPerPage } from '../../../constants'
import CourseReviewsSkeleton from
  '../../../../../../components/People/ContactCenter/SkeletonLoader/Training/reviewsSkeleton'
import { REQUEST_TYPES } from '../../../../../../utils/constants'

const CourseReviews = ({ courseId, openReviewModal, setOpenReviewModal }) => {
  const { ratings, addReviewAccess, loading } = useSelector((state) => state.courseRatings)
  const {
    count, currentPage, offset, reviewFilter, reviews, isLoading: reviewLoading, requestType,
  } = useSelector((state) => state.courseReviews)

  const [ anchorEl, setAnchorEl ] = useState(null)

  const dispatch = useDispatch()

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const noOfPages = Math.floor(count / noOfReviewsPerPage) + Math.sign(count % noOfReviewsPerPage)

  useEffect(() => () => dispatch(resetCourseReviewsReducer()), [ dispatch ])

  useEffect(() => {
    dispatch(courseRatingsFetchStart({ courseId }))
  }, [ dispatch, courseId ])

  useEffect(() => {
    dispatch(courseReviewsRequestStart({
      requestType: REQUEST_TYPES.FETCH,
      courseId,
      reviewFilter,
      offset,
    }))
  }, [ dispatch, reviewFilter, offset, courseId ])

  const onFilterClick = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [ setAnchorEl ])

  const handleFilterClose = useCallback(() => {
    setAnchorEl(null)
  }, [ setAnchorEl ])

  const changeCurrentPage = useCallback((__, page) => {
    dispatch(updateCourseReviewsFilterOrPage({
      currentPage: page,
      offset: noOfReviewsPerPage * (page - 1),
    }))
  }, [ dispatch ])

  return (
    <>
      <Box className='custom-box course-reviews-root'>
        <div className='heading-section'>
          <h3 className='h3'> Reviews </h3>
          {addReviewAccess && (
          <Button
            disabled={ reviewLoading || _.isNull(reviewLoading) || loading || _.isNull(loading) }
            className='leave-review-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => setOpenReviewModal(true) }
          >
            Leave Review
          </Button>
          )}
        </div>

        {/* Ratings */}
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
            totalAverageRating={ Number(ratings.totalAverageRating).toFixed(2) }
            totalAverageRaters={ ratings.totalAverageRaters }
          />
        )}

        {/* Reviews */}
        <Divider className='reviews-divider' />
        <div className='display-inline-flex is-fullwidth justify-between align-items-center ml-10'>
          <h4 className='h4'>{courseReviewsFilterStatus[ reviewFilter ]}</h4>
          <IconButton
            className='filter-icon'
            disabled={ reviewLoading || _.isNull(reviewLoading) || loading || _.isNull(loading) || _.isEmpty(reviews) }
            onClick={ onFilterClick }
          >
            <FilterIcon />
          </IconButton>
          <CourseReviewsFilterModal
            id={ id }
            anchorEl={ anchorEl }
            setAnchorEl={ setAnchorEl }
            open={ open }
            handleClose={ handleFilterClose }
          />
        </div>
        {(reviewLoading || _.isNull(reviewLoading)) && <CourseReviewsSkeleton />}
        {!reviewLoading && reviews && !_.isEmpty(reviews) && <ReviewsList reviews={ reviews } />}
        {!reviewLoading && (reviews && reviews.length === 0) && (
          <div className='mt-10 mb-10 is-fullwidth'>
            <h3 className='h3 text-center'> No reviews found! </h3>
          </div>
        )}

        {/* Pagination */}
        {!reviewLoading && !loading && !!count && count > noOfReviewsPerPage && (
          <Pagination
            count={ noOfPages }
            shape='round'
            page={ currentPage }
            onChange={ changeCurrentPage }
            classes={ { root: 'mb-10' } }
            className='is-flex is-center'
          />
        )}
      </Box>

      {/* Leave Review */}
      <AddCourseReview
        courseId={ courseId }
        openReviewModal={ openReviewModal }
        setOpenReviewModal={ setOpenReviewModal }
        loading={ reviewLoading }
        requestType={ requestType }
      />
    </>
  )
}

CourseReviews.propTypes = {
  courseId: PropTypes.number.isRequired,
  openReviewModal: PropTypes.bool.isRequired,
  setOpenReviewModal: PropTypes.func.isRequired,
}

export default CourseReviews
