import React, { useState } from 'react'
import {
  Button, Tabs, Tab, Divider,
} from '@material-ui/core'
import Reviews from '../../People/ContactCenter/Reviews'
import { reviews } from '../../People/ContactCenter/testData'
import ReviewModal from './reviewModal'
// import '../styles.scss'
import { clientRatingLabels } from './ratingLabels'
import ViewAllRatings from './viewAllRatings'

const ReviewsSection = () => {
  const [ activeTab, setActivetab ] = useState(0)
  const [ openReviewModal, setOpenReviewModal ] = useState(false)
  const [ rating, setRating ] = useState({
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  })

  const [ reviewText, setReviewText ] = useState('')
  return (
    <>
      <div className='mb-25 custom-box resume-root reviews-root has-fullwidth'>
        <div className='display-inline-flex is-fullwidth'>
          <h3 className='h3 is-fullwidth'> Reviews </h3>
          <Button
            classes={ {
              root: 'button-secondary-small review-button',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => setOpenReviewModal(true) }
          >
            Leave Review
          </Button>
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
              cultureRating: 4.3,
              leadershipRating: 3,
              careerAdvancementRating: 5,
              compensationRating: 4,
            } }
            totalAverageRating={ 4.3 }
            totalAverageRaters={ 12 }
          />
        </div>
        <Divider className='divider' />
        {reviews.map((reviewData) => (
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
        onSubmit={ () => setOpenReviewModal(false) }
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

export default ReviewsSection
