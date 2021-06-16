import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ReviewModal from '../../../Shared/reviewModal'
import { profileReviewPostStart } from '../../../../redux-saga/redux/actions'
import { agentRatingLabels } from '../../../../components/Profile/Reviews/ratingLabels'

const AddAgentReview = ({
  agentUserId, openReviewModal, setOpenReviewModal,
}) => {
  const dispatch = useDispatch()
  const { postLoading, postSuccess } = useSelector((state) => state.profileReviews)
  const [ reviewText, setReviewText ] = useState('')
  const [ rating, setRating ] = useState({
    performanceRating: 0,
    teamPlayerRating: 0,
    customerInteractionRating: 0,
    dependabilityRating: 0,
  })

  // Handle post Review
  const handleSubmitReview = useCallback(() => {
    dispatch(profileReviewPostStart({
      profileType: 'agent',
      id: agentUserId,
      reviewData: {
        performanceRating: rating.performanceRating,
        teamPlayerRating: rating.teamPlayerRating,
        customerInteractionRating: rating.customerInteractionRating,
        dependabilityRating: rating.dependabilityRating,
        reviewText,
      },
    }))
  }, [ dispatch, rating, reviewText, agentUserId ])

  const handleOnReviewModalClose = useCallback(() => {
    setOpenReviewModal(false)
    setReviewText('')
    setRating({
      performanceRating: 0,
      teamPlayerRating: 0,
      customerInteractionRating: 0,
      dependabilityRating: 0,
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
      reviewHeading=' Please rate your work with the agent regarding the different criteria below'
      ratingLabels={ agentRatingLabels }
      rating={ rating }
      setRating={ setRating }
      reviewText={ reviewText }
      setReviewText={ setReviewText }
    />
  )
}

AddAgentReview.propTypes = {
  agentUserId: PropTypes.number.isRequired,
  openReviewModal: PropTypes.bool.isRequired,
  setOpenReviewModal: PropTypes.func.isRequired,
}
export default AddAgentReview
