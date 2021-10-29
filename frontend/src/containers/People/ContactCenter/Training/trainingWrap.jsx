import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, InputBase, Button, Grid, debounce, IconButton,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import ROUTE_PATHS from '../../../../routes/routesPath'
import CourseCard from './CourseCard'
import { updateViewAllCoursesFilter, updateCurrentPage } from '../../../../redux-saga/redux/people'
import CourseFilterModal from './courseFilterModal'
import { noOfCoursesPerPage } from '../constants'
import AllCoursesSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Training/allCoursesSkeleton'
import { FilterIcon } from '../../../../assets/images/training'
import { SearchIcon } from '../../../../assets/images/common'

const TrainingWrap = () => {
  const {
    courses, count, searchField, currentPage, isLoading, categoryTitle,
  } = useSelector((state) => state.viewAllCourses)

  const [ searchCourseField, setSearchCourseField ] = useState(searchField)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateViewAllCoursesFilter({
      offset: noOfCoursesPerPage * (currentPage - 1),
    }))
  }, [ currentPage, dispatch ])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCreateCourseButton = useCallback(() => {
    history.push(ROUTE_PATHS.CREATE_COURSE)
  }, [ history ])

  const searchCoursesApi = useCallback(debounce((nextValue) => {
    dispatch(updateViewAllCoursesFilter({
      searchField: nextValue,
      currentPage: 1,
    }))
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchCourseField(nextValue)
    searchCoursesApi(nextValue)
  }, [ searchCoursesApi ])

  const changeCurrentPage = useCallback((__, page) => {
    dispatch(updateCurrentPage({
      currentPage: page,
    }))
    scrollToTop()
  }, [ dispatch, scrollToTop ])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const noOfPages = Math.floor(count / noOfCoursesPerPage) + Math.sign(count % noOfCoursesPerPage)

  return (
    <div>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <div className='display-inline-flex is-fullwidth search-input'>
          <SearchIcon className='ml-10 mr-10 align-self-center' />
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
        <div className='all-courses-box mb-20'>
          {categoryTitle && <h3 className='h3'>{`${ categoryTitle } Courses`}</h3>}
          <IconButton
            onClick={ handleClick }
            disabled={ isLoading }
            aria-describedby={ id }
            className='filter'
          >
            <FilterIcon />
          </IconButton>
          <CourseFilterModal
            id={ id }
            anchorEl={ anchorEl }
            setAnchorEl={ setAnchorEl }
            open={ open }
            handleClose={ handleClose }
          />
        </div>
        {_.isNull(isLoading) || isLoading
          ? <AllCoursesSkeleton />
          : (
            <Grid container spacing={ 2 }>
              {(courses && courses.length === 0)
                ? (
                  <div className='mt-10 mb-10 is-fullwidth'>
                    <h3 className='h3 text-center'> No courses found! </h3>
                  </div>
                )
                : courses.map((cardInfo) => (
                  <CourseCard
                    key={ cardInfo.courseId }
                    courseId={ cardInfo.courseId }
                    priceQbe={ cardInfo.price }
                    priceUsd={ cardInfo.price }
                    ratingValue={ cardInfo.rating }
                    studentsCount={ cardInfo.studentsCount }
                    courseTitle={ cardInfo.title }
                    creatorDetails={ cardInfo.creatorDetails }
                    sectionsCount={ cardInfo.sectionsCount }
                    language={ cardInfo.language }
                    imageUrl={ cardInfo.imageUrl }
                  />
                ))}
            </Grid>
          )}
        {Boolean(count && count > noOfCoursesPerPage) && (
          <Pagination
            count={ noOfPages }
            shape='round'
            page={ currentPage }
            onChange={ changeCurrentPage }
            classes={ { root: 'courses-pagination' } }
            hidePrevButton={ currentPage < 2 }
            hideNextButton={ currentPage === noOfPages }
            className='is-flex is-center'
          />
        )}
      </Box>
    </div>
  )
}

export default TrainingWrap
