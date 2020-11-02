import React, { useState } from 'react'
import {
  Button, Divider, Tabs, Tab, Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { terry, carolin, helen } from '../../../../../assets/images/avatar'
import Reviews from '../../Reviews'
import { reviews } from '../../testData'
import '../styles.scss'

const ResumeReviews = () => {
  const [ activeTab, setActivetab ] = useState(0)
  return (
    <div className='box courses-root reviews-root has-fullwidth'>
      <h3 className='courses-heading mb-20'> Reviews </h3>
      <div className='custom-active-tabs'>
        <Tabs
          value={ activeTab }
          onChange={ (_, tab) => setActivetab(tab) }
        >
          <Tab label='Received' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
          <Tab label='Given' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
        </Tabs>
      </div>
      { activeTab === 0 && (
      <div>
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
        <Button className='text-button'> View All Reviews </Button>
      </div>
      ) }

      { activeTab === 1 && (
      <div>
        <div className='display-inline-flex review-section'>
          <Avatar className='profile-pic' alt='Terry Garret' src={ terry } />
          <div className='candidate-info'>
            <p className='reviewer-name'>Terry Garret</p>
            <p className='description'> Customer Service Specialist </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
            <p>
              Thank you !
            </p>
          </div>
        </div>
      </div>
      ) }
    </div>
  )
}

export default ResumeReviews
