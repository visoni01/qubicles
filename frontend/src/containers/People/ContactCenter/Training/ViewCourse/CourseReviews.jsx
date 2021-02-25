import React from 'react'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton } from '@material-ui/core'

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
    </Box>
  </>
)

export default CourseReviews
