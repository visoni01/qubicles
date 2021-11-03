import { Box, Grid, IconButton } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterIcon } from '../../../../../assets/images/training'
import AllCoursesSkeleton
  from '../../../../../components/People/ContactCenter/SkeletonLoader/Training/allCoursesSkeleton'
import { updateCompanyCoursesCurrentPage, updateCompanyCoursesFilter } from '../../../../../redux-saga/redux/people'
import { noOfCoursesPerPage } from '../../constants'
import CourseCard from '../CourseCard'
import CourseFilterModal from '../courseFilterModal'

const CompanyCoursesWrap = () => {
  const [ anchorEl, setAnchorEl ] = useState(null)

  const {
    isLoading, courses, count, currentPage, companyName, courseFilter,
  } = useSelector((state) => state.companyCourses)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateCompanyCoursesFilter({
      offset: noOfCoursesPerPage * (currentPage - 1),
    }))
  }, [ dispatch, currentPage ])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const changeCurrentPage = useCallback((__, page) => {
    dispatch(updateCompanyCoursesCurrentPage({ currentPage: page }))
    scrollToTop()
  }, [ dispatch, scrollToTop ])

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const noOfPages = Math.floor(count / noOfCoursesPerPage) + Math.sign(count % noOfCoursesPerPage)

  return (
    <Box className='custom-box'>
      <div className='all-courses-box mb-20'>
        {companyName && <h3 className='h3'>{`${ companyName } Courses`}</h3>}

        <IconButton
          className='filter'
          aria-describedby={ id }
          onClick={ (event) => setAnchorEl(event.currentTarget) }
          disabled={ isLoading }
        >
          <FilterIcon />
        </IconButton>

        <CourseFilterModal
          id={ id }
          anchorEl={ anchorEl }
          setAnchorEl={ setAnchorEl }
          open={ open }
          handleClose={ () => setAnchorEl(null) }
          courseFilter={ courseFilter }
          type='company'
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
  )
}

export default CompanyCoursesWrap
