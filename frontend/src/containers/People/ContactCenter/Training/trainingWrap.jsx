import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, InputBase, Button, Grid, debounce,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import ROUTE_PATHS from '../../../../routes/routesPath'
import CourseCard from './CourseCard'
import { updateViewAllCoursesFilter } from '../../../../redux-saga/redux/people'

const TrainingWrap = () => {
  const { courses, categoryId, searchField } = useSelector((state) => state.viewAllCourses)
  const [ searchCourseField, setSearchCourseField ] = useState(searchField)

  const history = useHistory()
  const dispatch = useDispatch()

  const handleCreateCourseButton = useCallback(() => {
    history.push(ROUTE_PATHS.CREATE_COURSE)
  }, [ history ])

  const searchCoursesApi = useCallback(debounce((nextValue) => {
    dispatch(updateViewAllCoursesFilter({
      searchField: nextValue,
      categoryId,
    }))
  }, 500), [ dispatch, categoryId ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchCourseField(nextValue)
    searchCoursesApi(nextValue)
  }, [ searchCoursesApi ])

  return (
    <div>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <div className='search-input'>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
          <InputBase
            type='text'
            placeholder='Search Courses'
            autoComplete='off'
            className='input-field'
            name='searchCourses'
            onChange={ handleSearch }
            value={ searchCourseField }
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
          {courses.map((cardInfo) => (
            <CourseCard
              key={ cardInfo.courseId }
              courseId={ cardInfo.courseId }
              priceQbe={ cardInfo.price }
              priceUsd={ cardInfo.price }
              ratingValue={ cardInfo.rating }
              studentsCount={ cardInfo.studentsCount }
              courseDescription={ cardInfo.title }
              sectionsCount={ 4 }
              language={ cardInfo.language }
              imageUrl={ cardInfo.imageUrl }
            />
          ))}
          {(courses && courses.length === 0) && (
          <div className='mt-10 mb-10 is-fullwidth'>
            <h3 className='h3 text-center'>No courses found!</h3>
          </div>
          )}
        </Grid>
      </Box>
    </div>
  )
}

export default TrainingWrap
