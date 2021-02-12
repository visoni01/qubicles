import { Box, Divider } from '@material-ui/core'
import React from 'react'
import { courses } from './mockData'

const Courses = () => (
  <Box className='custom-box mb-30'>
    <h3 className='h3 mb-20'>Courses</h3>
    <div>
      {courses.map((course, index) => (
        <>
          <div key={ course.company } className='mt-20 mb-20'>
            <p className='primary-text-link'>{course.name}</p>
            <p className='para light mb-10'>{course.by}</p>
            <p className='para'>{course.duration}</p>
          </div>
          { courses.length !== (index + 1) && <Divider />}
        </>
      ))}
    </div>
  </Box>
)

export default Courses
