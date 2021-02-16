import React, { useState, useEffect, useCallback } from 'react'
import {
  Button, Tabs, Tab, Divider,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Reviews from '../../People/ContactCenter/Reviews'
import ReviewModal from './reviewModal'
import { clientRatingLabels } from './ratingLabels'
import ViewAllRatings from './viewAllRatings'

import { companyRatingsFetchStart, companyReviewPostStart } from '../../../redux-saga/redux/actions'

const ReviewsSection = ({
  companyId,
}) => {
  const [ activeTab, setActivetab ] = useState(0)
  const [ reviewsList, setReviewsList ] = useState([])
  const { userDetails } = useSelector((state) => state.login)
  const [ openReviewModal, setOpenReviewModal ] = useState(false)
  const { recievedReviews, givenReviews } = useSelector((state) => state.companyReviews)
  const { viewRatings } = useSelector((state) => state.companyRatings)
  const [ rating, setRating ] = useState({
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  })
  const [ reviewText, setReviewText ] = useState('')
  const dispatch = useDispatch()

  const handleSubmitReview = useCallback(() => {
    dispatch(companyReviewPostStart({
      clientId: companyId,
      reviewData: {
        cultureRating: rating.cultureRating,
        leadershipRating: rating.leadershipRating,
        careerRating: rating.careerAdvancementRating,
        compensationRating: rating.compensationRating,
        reviewText,
      },
    }))
  }, [ dispatch, rating, reviewText, companyId ])

  useEffect(() => {
    if (activeTab === 0) {
      setReviewsList(recievedReviews)
    } else if (activeTab === 1) {
      setReviewsList(givenReviews)
    }
  }, [ activeTab, recievedReviews, givenReviews ])

  useEffect(() => {
    dispatch(companyRatingsFetchStart({
      clientId: companyId,
    }))
  }, [ dispatch, companyId ])

  return (
    <>
      <div className='mb-25 custom-box resume-root reviews-root has-fullwidth'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 is-fullwidth'> Reviews </h3>
          {userDetails.user_id !== companyId && (
          <Button
            classes={ {
              root: 'button-secondary-small review-button',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => setOpenReviewModal(true) }
          >
            Leave Review
          </Button>
          )}
        </div>
        <div className='custom-active-tabs'>
          <Tabs
            value={ activeTab }
            onChange={ (_, tab) => setActivetab(tab) }
          >
            <Tab label='Received' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
            <Tab label='Given' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
          </Tabs>
        </div>
        <div className='review-section-rating-view'>
          <ViewAllRatings
            subRatingLabels={ clientRatingLabels }
            subRatingValues={ {
              cultureRating: viewRatings.cultureRating,
              leadershipRating: viewRatings.leadershipRating,
              careerAdvancementRating: viewRatings.careerAdvancementRating,
              compensationRating: viewRatings.compensationRating,
            } }
            totalAverageRating={ viewRatings.totalAverageRating }
            totalAverageRaters={ viewRatings.totalAverageRaters }
          />
        </div>
        <Divider className='divider' />
        {reviewsList.map((reviewData) => (
          <Reviews
            key={ reviewData.reviewerName }
            imageName={ reviewData.imageName }
            rating={ reviewData.rating }
            imageSrc={ reviewData.imageSrc }
            reviewerName={ reviewData.reviewerName }
            date={ reviewData.date }
            position={ reviewData.position }
            review={ reviewData.review }
          />
        ))}
      </div>
      {openReviewModal && (
      <ReviewModal
        open={ openReviewModal }
        onClose={ () => setOpenReviewModal(false) }
        onSubmit={ handleSubmitReview }
        reviewHeading=' Please rate your work with the company regarding the different criteria below'
        ratingLabels={ clientRatingLabels }
        rating={ rating }
        setRating={ setRating }
        reviewText={ reviewText }
        setReviewText={ setReviewText }
      />
      )}
    </>
  )
}

ReviewsSection.propTypes = {
  companyId: PropTypes.number.isRequired,
}

export default ReviewsSection
