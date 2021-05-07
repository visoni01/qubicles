import React, {
  useCallback, useEffect, useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { updateTrainingCourseDetails } from '../../../../../redux-saga/redux/people'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'
import PreviewCreateCourse from './previewCourse'
import CreateCourse from './createCourse'
import './styles.scss'
import AlertPopover from '../../../../Shared/alertPopover'
import checkAndSetErrors from './checkAndSetErrors'

const NewCoursePage = () => {
  const { course, isLoading } = useSelector((state) => state.trainingCourse)
  const [ informationSection, setInformationSection ] = useState(course.informationSection)
  const [ contentSection, setContentSection ] = useState(course.contentSection)
  const [ courseContent, setCourseContent ] = useState(course.courseContent)
  const [ isPreview, setIsPreview ] = useState(false)
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)
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

  useEffect(() => {
    setInformationSection((current) => ({
      ...current,
      creatorId: userDetails.user_id,
    }))
  }, [ userDetails.user_id ])

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
        handleErrors={ handleErrors }
        errors={ errors }
      />
    </>
  )
}

export default NewCoursePage
