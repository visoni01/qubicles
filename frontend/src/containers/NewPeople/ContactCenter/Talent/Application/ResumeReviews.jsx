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
    <div className='mb-25 custom-box resume-root reviews-root has-fullwidth'>
      <h3 className='h3 is-fullwidth mb-20'> Reviews </h3>
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
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-text bold center',
            label: 'MuiButton-label button-primary-text-label',
          } }
        >
          View All Reviews
        </Button>
      </div>
      ) }

      { activeTab === 1 && (
      <div>
        <div className='display-inline-flex review-section'>
          <Avatar className='profile-pic' alt='Terry Garret' src={ terry } />
          <div className='candidate-info'>
            <p className='para bold'>Terry Garret</p>
            <p className='para light'> Customer Service Specialist </p>
            <Rating
              className='rating-star no-margin'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
            <p className='para'>
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
