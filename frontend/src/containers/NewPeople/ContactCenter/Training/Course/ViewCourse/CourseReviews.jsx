import React, { useCallback } from 'react'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Reviews from '../../../Reviews'
import { reviews } from '../../../testData'

const CourseReviews = () => {
  const history = useHistory()

  return (
    <>
      <Box className='box course-reviews-root'>
        <div className='heading-section'>
          <h3 className='h3'>Reviews</h3>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={ faSlidersH } className='filter-icon' />
            </IconButton>
          </div>
        </div>
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
      </Box>
    </>
  )
}

export default CourseReviews
