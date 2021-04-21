import React, { useCallback } from 'react'
import {
  Box, InputBase, Button, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { courseCards } from '../testData'
import ROUTE_PATHS from '../../../../routes/routesPath'
import CourseCard from './CourseCard'

const TrainingWrap = () => {
  const history = useHistory()
  const handleCreateCourseButton = useCallback(() => {
    history.push(ROUTE_PATHS.CREATE_COURSE)
  }, [ history ])
  return (
    <div>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <div className='search-input'>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
          <InputBase
            placeholder='Search Courses'
            className='input-field'
          />
        </div>
        <Button
          className='search-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label pl-10 pr-10',
          } }
          onClick={ handleCreateCourseButton }
        >
          Create Course
        </Button>
      </div>
      <Box className='custom-box'>
        <h3 className='h3 mb-20'>All Courses</h3>
        <Grid container spacing={ 2 }>
          {courseCards.map((cardInfo) => (
            <CourseCard
              key={ cardInfo.courseId }
              priceQbe={ cardInfo.priceQbe }
              priceUsd={ cardInfo.priceUsd }
              ratingValue={ cardInfo.ratingValue }
              studentsCount={ cardInfo.studentsCount }
              courseDescription={ cardInfo.courseDescription }
              sectionsCount={ cardInfo.sectionsCount }
              language={ cardInfo.language }
              imageUrl={ cardInfo.imageUrl }
            />
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default TrainingWrap
