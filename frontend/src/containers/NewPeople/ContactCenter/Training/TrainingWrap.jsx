import React from 'react'
import { Box, InputBase, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import CourseBox from './CourseBox'

const TrainingWrap = () => (
  <div>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <div className='search-input'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
        <InputBase
          placeholder='Search Courses'
          className='input-field'
        />
      </div>
      <Button
        className='search-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        Create Course
      </Button>
    </div>
    <Box className='box'>
      <h3 className='courses-heading'>All Courses</h3>
      <div className='courses-container'>
        <CourseBox />
        <CourseBox />
        <CourseBox />
        <CourseBox />
        <CourseBox />
      </div>
    </Box>
  </div>
)

export default TrainingWrap
