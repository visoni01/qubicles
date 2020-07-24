import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import classNames from 'classnames'
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
        <div className='vt-content width-full'>
          <div className='star-rating color-secondary is-hidden-mobile'>
            <StarRatings
              rating={ rating }
              starRatedColor='#7F00FF'
              numberOfStars={ 5 }
              starDimension='17px'
              starSpacing='1px'
            />
          </div>
          <h6 className='vt-name'>{ name }</h6>
          <div className='vt-text'>
            { message }
          </div>
        </div>
      </div>
    </div>
  ))
}

export default ClientReviews
