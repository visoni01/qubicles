import React from 'react'
import { Box, Button, IconButton } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { FilterIcon } from '../../../../../../assets/images/training'
import ViewAllRatings from '../../../../../Shared/viewAllRatings'
import courseRatingLabels from './ratingLabels'
import ReviewsList from './reviewsList'

const CourseReviews = () => (
  <>
    <Box className='custom-box course-reviews-root'>
      <div className='heading-section'>
        <h3 className='h3'>Reviews</h3>
        <IconButton className='filter-icon'>
          <FilterIcon />
        </IconButton>
        <Button
          className='leave-review-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Leave Review
        </Button>
      </div>

      <ViewAllRatings
        subRatingLabels={ courseRatingLabels }
        subRatingValues={ {
          valueRating: 5,
          clarityRating: 4,
          contentRating: 1,
          structureRating: 3,
        } }
        totalAverageRating={ 3.8 }
        totalAverageRaters={ 15 }
      />

      <ReviewsList />

      <Pagination
        count={ 3 }
        shape='round'
        page={ 1 }
        onChange={ null }
        classes={ { root: 'courses-pagination' } }
        hidePrevButton={ 1 < 2 }
        hideNextButton={ 1 === 3 }
        className='is-flex is-center'
      />
    </Box>
  </>
)

export default CourseReviews
