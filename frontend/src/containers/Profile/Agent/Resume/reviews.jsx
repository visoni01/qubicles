import React, { useState } from 'react'
import {
  Avatar,
  Box, Divider, Tab, Tabs,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { reviewsMock } from './mockData'
import { kareem } from '../../../../assets/images/avatar'

const ReviewList = ({ reviews }) => (reviews.map((review, index) => (
  <>
    <div key={ review.name } className='display-inline-flex mt-20 mb-20'>
      <Avatar className='mr-10' src={ kareem } />
      <div>
        <p className='para bold'>{review.name}</p>
        <p className='para light'>
          {review.title}
          {' '}
          at
          {' '}
          {review.company}
        </p>
        <Rating value={ review.rating } size='small' className='rating-star-color' />
        <p className='para'>{review.description}</p>
      </div>
    </div>
    { reviews.length !== (index + 1) && <Divider />}
  </>
)))

const Reviews = () => {
  const [ activeTab, setActiveTab ] = useState(0)
  return (
    <Box className='custom-box'>
      <h3 className='h3'>Reviews</h3>
      <Tabs
        value={ activeTab }
        onChange={ (_, val) => setActiveTab(val) }
      >
        <Tab
          className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' }
          label='Received'
        />
        <Tab
          className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' }
          label='Given'
        />
      </Tabs>
      <ReviewList
        reviews={ activeTab === 0 ? reviewsMock.received : reviewsMock.given }
      />
    </Box>
  )
}

export default Reviews
