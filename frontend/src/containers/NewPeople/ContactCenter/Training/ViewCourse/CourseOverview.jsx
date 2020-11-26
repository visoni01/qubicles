import React from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@material-ui/core'
import CourseContentWrap from './CourseContentWrap'

const CourseOverview = () => (
  <>
    <Box className='custom-box course-overview-root'>
      <div className='heading-section'>
        <h3 className='h3'>Overview</h3>
        <p className='contents para mt-10'>
          4 sections
          <FontAwesomeIcon className='custom-fa-icon' icon={ faCircle } />
          19 units
        </p>
      </div>
      <CourseContentWrap />
    </Box>
  </>
)

export default CourseOverview
