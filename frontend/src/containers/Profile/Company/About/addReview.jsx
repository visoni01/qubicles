import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ReviewModal from '../../OtherAgent/reviewModal'
import { companyReviewPostStart } from '../../../../redux-saga/redux/actions'
import { clientRatingLabels } from '../../OtherAgent/ratingLabels'

const AddCompanyReview = ({
  clientId, openReviewModal, setOpenReviewModal,
}) => {
  const dispatch = useDispatch()
  const { postLoading, postSuccess } = useSelector((state) => state.companyReviews)
  const [ reviewText, setReviewText ] = useState('')
  const [ rating, setRating ] = useState({
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  })

  // Handle post Review
  const handleSubmitReview = useCallback(() => {
    dispatch(companyReviewPostStart({
      clientId,
      reviewData: {
        cultureRating: rating.cultureRating,
        leadershipRating: rating.leadershipRating,
        careerRating: rating.careerAdvancementRating,
        compensationRating: rating.compensationRating,
        reviewText,
      },
    }))
  }, [ dispatch, rating, reviewText, clientId ])

  const handleOnReviewModalClose = useCallback(() => {
    setOpenReviewModal(false)
    setReviewText('')
    setRating({
      cultureRating: 0,
      leadershipRating: 0,
      careerAdvancementRating: 0,
      compensationRating: 0,
    })
  }, [ setOpenReviewModal ])

  // Close Modal on post review success
  useEffect(() => {
    if (!postLoading && postSuccess) {
      handleOnReviewModalClose()
    }
  }, [ postLoading, postSuccess, handleOnReviewModalClose ])

  return (
    <ReviewModal
      loading={ postLoading }
      open={ openReviewModal }
      onClose={ handleOnReviewModalClose }
      onSubmit={ handleSubmitReview }
      reviewHeading=' Please rate your work with the company regarding the different criteria below'
      ratingLabels={ clientRatingLabels }
      rating={ rating }
      setRating={ setRating }
      reviewText={ reviewText }
      setReviewText={ setReviewText }
    />
  )
}

AddCompanyReview.propTypes = {
  clientId: PropTypes.number.isRequired,
  openReviewModal: PropTypes.bool.isRequired,
  setOpenReviewModal: PropTypes.func.isRequired,
}
export default AddCompanyReview
