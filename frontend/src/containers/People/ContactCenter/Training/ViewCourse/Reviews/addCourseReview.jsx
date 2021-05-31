import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ReviewModal from '../../../../../Shared/reviewModal'
import courseRatingLabels from './ratingLabels'
import { courseReviewsRequestStart } from '../../../../../../redux-saga/redux/people'

const AddCourseReview = ({
  openReviewModal, setOpenReviewModal, courseId, loading, requestType,
}) => {
  const dispatch = useDispatch()
  const [ reviewText, setReviewText ] = useState('')
  const [ rating, setRating ] = useState({
    valueRating: 0,
    clarityRating: 0,
    contentRating: 0,
    structureRating: 0,
  })

  const handleOnReviewModalClose = useCallback(() => {
    setOpenReviewModal(false)
    setReviewText('')
    setRating({
      valueRating: 0,
      clarityRating: 0,
      contentRating: 0,
      structureRating: 0,
    })
  }, [ setOpenReviewModal ])

  const submitReview = useCallback(() => {
    dispatch(courseReviewsRequestStart({
      requestType: 'CREATE',
      courseId,
      reviewData: {
        value: rating.valueRating,
        clarity: rating.clarityRating,
        content: rating.contentRating,
        structure: rating.structureRating,
        comment: reviewText,
      },
    }))
  }, [ dispatch, rating, courseId, reviewText ])

  useEffect(() => {
    if (!loading && requestType === 'CREATE') {
      handleOnReviewModalClose()
    }
  }, [ loading, requestType, handleOnReviewModalClose ])

  return (
    <ReviewModal
      loading={ loading && requestType === 'CREATE' }
      open={ openReviewModal }
      onClose={ handleOnReviewModalClose }
      onSubmit={ submitReview }
      reviewHeading='Please rate this course regarding the different criteria below.'
      ratingLabels={ courseRatingLabels }
      rating={ rating }
      setRating={ setRating }
      reviewText={ reviewText }
      setReviewText={ setReviewText }
      reviewRequired
    />
  )
}

AddCourseReview.defaultProps = {
  loading: null,
  requestType: null,
}

AddCourseReview.propTypes = {
  openReviewModal: PropTypes.bool.isRequired,
  setOpenReviewModal: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  requestType: PropTypes.string,
}
export default AddCourseReview
