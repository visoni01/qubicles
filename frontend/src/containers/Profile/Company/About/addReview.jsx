import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ReviewModal from '../../../Shared/reviewModal'
import { profileReviewPostStart } from '../../../../redux-saga/redux/actions'
import { clientRatingLabels } from '../../../../components/Profile/Reviews/ratingLabels'
import { USERS } from '../../../../utils/constants'

const AddCompanyReview = ({ clientId, openReviewModal, setOpenReviewModal }) => {
  const [ reviewText, setReviewText ] = useState('')
  const [ rating, setRating ] = useState({
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  })

  const { postLoading, postSuccess } = useSelector((state) => state.profileReviews)

  const dispatch = useDispatch()

  // Handle post Review
  const handleSubmitReview = useCallback(() => {
    dispatch(profileReviewPostStart({
      profileType: USERS.EMPLOYER,
      id: clientId,
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
