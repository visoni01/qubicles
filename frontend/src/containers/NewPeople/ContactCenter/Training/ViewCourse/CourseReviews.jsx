import React from 'react'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton } from '@material-ui/core'
import Reviews from '../../Reviews'
import { reviews } from '../../testData'

const CourseReviews = () => (
  <>
    <Box className='custom-box course-reviews-root'>
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

export default CourseReviews
