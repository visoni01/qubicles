import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Rating from '@material-ui/lab/Rating'
import { reviews } from './data'

const ClientReviews = () => {
  const [ currentReview, setCurrentReview ] = useState(0)

  useEffect(() => {
    setTimeout(() => setCurrentReview((currentReview + 1) % reviews.length), 2000)
  }, [ currentReview ])

  return reviews.map(({
    name, message, rating, image,
  }, index) => (
    <div
      className={
        classNames(
          'flex-card vtestimonial-item light-bordered padding-20',
          currentReview === index ? '' : 'review-low-opacity',
        )
      }
      key={ name }
    >
      <div className='content content-flex'>
        <img
          className='vt-avatar is-hidden-mobile'
          src={ image || 'https://via.placeholder.com/250x250' }
          alt=''
        />
        <div className='vt-content is-fullwidth'>
          <div className='star-rating color-secondary is-hidden-mobile'>
            <Rating
              value={ rating }
              name='read-only'
              readOnly
              size='small'
            />
          </div>
          <h6 className='vt-name'>{ name }</h6>
          <div className='vt-text'>{ message }</div>
        </div>
      </div>
    </div>
  ))
}

export default ClientReviews
