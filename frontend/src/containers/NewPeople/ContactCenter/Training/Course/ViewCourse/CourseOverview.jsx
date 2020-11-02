import React, { useState } from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@material-ui/core'
import CourseContents from './CourseContents'
// import CoursePreview from './CoursePreview'

const CourseOverview = () => {
  const [ openCoursePlayer, setOpenCoursePlayer ] = useState(true)

  return (
    <>
      <Box className='box course-overview-root'>
        <div className='heading-section'>
          <h3 className='h3'>Overview</h3>
          <p className='contents para mt-10'>
            4 sections
            <FontAwesomeIcon icon={ faCircle } />
            19 units
          </p>
        </div>
        <CourseContents />
      </Box>
    </>
  )
}

export default CourseOverview
