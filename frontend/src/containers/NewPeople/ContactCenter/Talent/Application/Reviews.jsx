import React, { useState } from 'react'
import {
  Button, Divider, Tabs, Tab, Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { terry, carolin, helen } from '../../../../../assets/images/avatar'
import '../styles.scss'

const Reviews = () => {
  const [ activeTab, setActivetab ] = useState(0)
  return (
    <div className='box courses-root reviews-root has-fullwidth'>
      <h3 className='courses-heading mb-20'> Reviews </h3>
      <div className='people-active-tabs'>
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
        <div className='display-inline-flex review-section'>
          <Avatar className='profile-pic' alt='carolin' src={ carolin } />
          <div className='candidate-info'>
            <p className='reviewer-name'>Jasmine Palmer</p>
            <p className='description'> Customer Service Manager at Good Call Center </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
            <p>
              Thank you Terry for your invaluable contribution in working with us and pioneering this program!
              You have been an asset to helping us set up the process for this role. In truth, overqualified for this.
              We wish you could have stayed with us longer.
            </p>
          </div>
        </div>
        <Divider className='divider' />
        <div className='display-inline-flex review-section'>
          <Avatar className='profile-pic' alt='helen' src={ helen } />
          <div className='candidate-info'>
            <p className='reviewer-name'>Elizabeth Valdez</p>
            <p className='description'> Customer Account Manager at ICC </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
            <p>
              Terry's relentless drive has taken ICC towards great success. He is organized, efficient,
              and willing to do whatever is needed to complete a set goal. I would recomend him anytime.
            </p>
          </div>
        </div>
        <Divider className='divider' />
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
        <Divider className='divider' />
      </div>
      ) }
    </div>
  )
}

export default Reviews
