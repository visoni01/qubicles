import React, {
  useCallback, useEffect, useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import {
  updateTrainingCourseDetails,
  trainingCourseRequestStart,
  resetTrainingCourseReducer,
} from '../../../../../redux-saga/redux/people'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'
import PreviewCreateCourse from './previewCourse'
import CreateCourse from './createCourse'
import './styles.scss'
import checkAndSetErrors from './checkAndSetErrors'
import AlertPopover from '../../../../Shared/alertPopover'

const EditCoursePage = () => {
  const { course, isLoading } = useSelector((state) => state.trainingCourse)
  const [ informationSection, setInformationSection ] = useState(course.informationSection)
  const [ contentSection, setContentSection ] = useState(course.contentSection)
  const [ courseContent, setCourseContent ] = useState(course.courseContent)
  const [ isPreview, setIsPreview ] = useState(false)

  const dispatch = useDispatch()

  const [ errors, setErrors ] = useState({})

  const handleErrors = useCallback(() => (
    checkAndSetErrors({
      setErrors, informationSection, contentSection, courseContent,
    })
  ), [ informationSection, contentSection, courseContent ])

  const updateCourseReducer = useCallback(() => {
    dispatch(updateTrainingCourseDetails({
      course: {
        informationSection,
        contentSection,
        courseContent,
      },
    }))
  }, [ informationSection, contentSection, courseContent, dispatch ])

  useEffect(() => () => dispatch(resetTrainingCourseReducer()), [ dispatch ])

  useEffect(() => {
    setInformationSection(course.informationSection)
    setContentSection(course.contentSection)
    setCourseContent(course.courseContent)
  }, [ dispatch, course ])

  const { courseId } = useParams()
  useEffect(() => {
    dispatch(trainingCourseRequestStart({
      course: {
        courseId,
      },
      requestType: 'FETCH',
    }))
  }, [ dispatch, courseId ])

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoader())
    } else {
      dispatch(stopLoader())
    }
  }, [ isLoading, dispatch ])

  if (isPreview) {
    return (
      <PreviewCreateCourse
        informationSection={ informationSection }
        contentSection={ contentSection }
        courseContent={ courseContent }
        isPreview={ isPreview }
        course={ course }
        setIsPreview={ setIsPreview }
        updateCourseReducer={ updateCourseReducer }
      />
    )
  }

  return (
    <>
      <AlertPopover
        open={ !_.isEmpty(errors) }
        buttonOnClick={ () => setErrors({}) }
        alertTitle='Oops!'
        alertBody='Please fill in all the required fields first'
      />
      <CreateCourse
        informationSection={ informationSection }
        setInformationSection={ setInformationSection }
        contentSection={ contentSection }
        setContentSection={ setContentSection }
        courseContent={ courseContent }
        setCourseContent={ setCourseContent }
        isPreview={ isPreview }
        setIsPreview={ setIsPreview }
        course={ course }
        updateCourseReducer={ updateCourseReducer }
        isEdit
        handleErrors={ handleErrors }
        errors={ errors }
      />
    </>
  )
}

export default EditCoursePage
