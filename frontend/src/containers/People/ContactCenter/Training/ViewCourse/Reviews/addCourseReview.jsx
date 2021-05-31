import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import ReviewModal from '../../../../../Shared/reviewModal'
import courseRatingLabels from './ratingLabels'

const AddCourseReview = ({
  openReviewModal, setOpenReviewModal,
}) => {
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

  return (
    <ReviewModal
      loading={ false }
      open={ openReviewModal }
      onClose={ handleOnReviewModalClose }
      onSubmit={ null }
      reviewHeading=' Please rate your work with the company regarding the different criteria below'
      ratingLabels={ courseRatingLabels }
      rating={ rating }
      setRating={ setRating }
      reviewText={ reviewText }
      setReviewText={ setReviewText }
    />
  )
}

AddCourseReview.propTypes = {
  openReviewModal: PropTypes.bool.isRequired,
  setOpenReviewModal: PropTypes.func.isRequired,
}
export default AddCourseReview
