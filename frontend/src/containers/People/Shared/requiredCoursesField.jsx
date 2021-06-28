import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from '@material-ui/core'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {
  bonusCoursesFetchStart, requiredCoursesFetchStart, resetBonusCoursesReducer, resetRequiredCoursesReducer,
} from '../../../redux-saga/redux/people'
import { noOfRequiredCoursesPerFetch } from '../ContactCenter/constants'
import { VIEW_COURSE_ROUTE } from '../../../routes/routesPath'
import MultiSelectLinkItems from '../../Shared/multiSelectLinkItems'
import { formatDate } from '../../../utils/common'

const RequiredCoursesField = ({ selectedCourses, setSelectedCourses, coursesType }) => {
  const {
    allCourses, searchKeyword, count, offset, isLoading: coursesLoading,
  } = useSelector((state) => state[ coursesType ])
  const dispatch = useDispatch()

  // Fetch courses initially
  useEffect(() => {
    if (_.isNull(coursesLoading) && _.isEmpty(allCourses)) {
      if (_.isEqual(coursesType, 'requiredCourses')) {
        dispatch(requiredCoursesFetchStart({ searchKeyword: '', offset: 0 }))
      } else {
        dispatch(bonusCoursesFetchStart({ searchKeyword: '', offset: 0 }))
      }
    }
  }, [ dispatch, coursesLoading, allCourses, coursesType ])

  // Reset data in reducer
  useEffect(() => () => {
    if (_.isEqual(coursesType, 'requiredCourses')) {
      dispatch(resetRequiredCoursesReducer())
    } else {
      dispatch(resetBonusCoursesReducer())
    }
  }, [ dispatch, coursesType ])

  // Search Courses
  const searchCourses = useCallback(debounce((nextValue) => {
    if (_.isEqual(coursesType, 'requiredCourses')) {
      dispatch(requiredCoursesFetchStart({
        searchKeyword: nextValue,
        offset: 0,
      }))
    } else {
      dispatch(bonusCoursesFetchStart({
        searchKeyword: nextValue,
        offset: 0,
      }))
    }
  }, 500), [ dispatch, coursesType ])

  // Fetch more courses
  const viewMoreCourses = useCallback(() => {
    if (_.isEqual(coursesType, 'requiredCourses')) {
      dispatch(requiredCoursesFetchStart({
        searchKeyword,
        offset: offset + noOfRequiredCoursesPerFetch,
      }))
    } else {
      dispatch(bonusCoursesFetchStart({
        searchKeyword,
        offset: offset + noOfRequiredCoursesPerFetch,
      }))
    }
  }, [ dispatch, searchKeyword, offset, coursesType ])

  return (
    <MultiSelectLinkItems
      items={
        _.isEmpty(_.unionBy(selectedCourses, allCourses, 'courseId'))
          ? []
          : _.unionBy(selectedCourses, allCourses, 'courseId')
            .map((course) => ({
              id: course.courseId,
              title: course.courseTitle,
              subtitle: `${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`,
              image: course.courseImage,
              status: !(selectedCourses
                && _.findIndex(selectedCourses, { courseId: course.courseId }) === -1),
              creatorName: course.creatorName,
              createdAt: course.createdAt,
            }))
      }
      initialData={ _.isEmpty(selectedCourses)
        ? []
        : selectedCourses.map((course) => ({
          id: course.courseId,
          title: course.courseTitle,
          subtitle: `${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`,
          image: course.courseImage,
          status: true,
          creatorName: course.creatorName,
          createdAt: course.createdAt,
        })) }
      placeholderOnBlur={ selectedCourses
        && `${ selectedCourses.length } ${ selectedCourses.length === 1
          ? 'Course' : 'Courses' } Selected` }
      placeholderOnFocus='Search Courses'
      onChange={ setSelectedCourses }
      onTextChange={ (e) => searchCourses(e.target.value) }
      loading={ coursesLoading }
      textLinkBase={ `${ VIEW_COURSE_ROUTE }` }
      bottomActionText={ allCourses.length < count ? 'View More...' : '' }
      bottomAction={ viewMoreCourses }
      inputText={ searchKeyword }
      showThumbnailImage
      selectedLabel='Selected Courses'
      notSelectedLabel='Search'
      disableAutocomplete
    />
  )
}

RequiredCoursesField.propTypes = {
  selectedCourses: PropTypes.arrayOf(PropTypes.shape({
    courseId: PropTypes.number.isRequired,
    courseTitle: PropTypes.string.isRequired,
    courseImage: PropTypes.string.isRequired,
    creatorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  setSelectedCourses: PropTypes.func.isRequired,
  coursesType: PropTypes.oneOf([ 'requiredCourses', 'bonusCourses' ]).isRequired,
}

export default RequiredCoursesField
