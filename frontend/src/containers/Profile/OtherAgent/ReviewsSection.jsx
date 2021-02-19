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
import {
  companyRatingsFetchStart, companyReviewPostStart,
  companyReviewsFetchStart,
} from '../../../redux-saga/redux/actions'
import Loader from '../../../components/loaders/circularLoader'

const ReviewsSection = ({
  companyId,
}) => {
  const [ activeTab, setActivetab ] = useState(0)
  const [ reviewsList, setReviewsList ] = useState([])
  const [ openReviewModal, setOpenReviewModal ] = useState(false)
  const {
    recievedReviews, givenReviews, postLoading, postSuccess,
  } = useSelector((state) => state.companyReviews)
  const {
    viewRatings, addReviewAccess, fetchLoading, fetchSuccess,
  } = useSelector((state) => state.companyRatings)
  const [ rating, setRating ] = useState({
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  })

  const [ reviewText, setReviewText ] = useState('')
  const dispatch = useDispatch()

  // Handle post Review
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

  useEffect(() => {
    if (!postLoading && postSuccess) {
      setOpenReviewModal(false)
    }
  }, [ postLoading, postSuccess ])

  useEffect(() => {
    dispatch(companyReviewsFetchStart({
      type: activeTab === 0 ? 'recieved' : 'given',
      clientId: companyId,
    }))
  }, [ dispatch, companyId, activeTab ])

  return (
    <>
      <div className='mb-25 custom-box resume-root reviews-root has-fullwidth'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 is-fullwidth'> Reviews </h3>
          {addReviewAccess && (
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
          {fetchLoading && !fetchSuccess ? (
            <Loader
              className='custom-loader'
              size={ 75 }
              enableOverlay={ false }
              displayLoaderManually
            />
          ) : (
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
          )}
        </div>
        {reviewsList.length > 0 && (
          <>
            <Divider className='divider' />
            {reviewsList.map((reviewData) => (
              <Reviews
                key={ reviewData.id }
                reviewText={ reviewData.reviewText }
                rating={ reviewData.rating }
                userDetails={ reviewData.userDetails }
              />
            ))}
          </>
        )}
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
