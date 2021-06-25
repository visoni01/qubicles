import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from '@material-ui/core'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { requiredCoursesFetchStart } from '../../../redux-saga/redux/people'
import { noOfRequiredCoursesPerFetch } from '../ContactCenter/constants'
import { VIEW_COURSE_ROUTE } from '../../../routes/routesPath'
import MultiSelectLinkItems from '../../Shared/multiSelectLinkItems'
import { formatDate } from '../../../utils/common'

const RequiredCoursesField = ({ selectedCourses, setSelectedCourses }) => {
  const {
    allCourses, searchKeyword, count, offset, isLoading: coursesLoading,
  } = useSelector((state) => state.requiredCourses)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isNull(coursesLoading) && _.isEmpty(allCourses)) {
      dispatch(requiredCoursesFetchStart({ searchKeyword: '', offset: 0 }))
    }
  }, [ dispatch, coursesLoading, allCourses ])

  const searchCourses = useCallback(debounce((nextValue) => {
    dispatch(requiredCoursesFetchStart({
      searchKeyword: nextValue,
      offset: 0,
    }))
  }, 500), [ dispatch ])

  // Fetch more courses
  const viewMoreCourses = useCallback(() => {
    dispatch(requiredCoursesFetchStart({
      searchKeyword,
      offset: offset + noOfRequiredCoursesPerFetch,
    }))
  }, [ dispatch, searchKeyword, offset ])

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
}

export default RequiredCoursesField
