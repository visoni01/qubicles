import React, {
  useCallback, useEffect, useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { updateTrainingCourseDetails } from '../../../../../redux-saga/redux/people'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'
import PreviewCreateCourse from '../../../../../components/People/ContactCenter/Training/NewCourse/previewCourse'
import CreateCourse from './createCourse'
import './styles.scss'
import AlertPopover from '../../../../../components/CommonModal/alertPopover'
import checkAndSetErrors from './checkAndSetErrors'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const NewCoursePage = () => {
  const {
    course, isLoading, requestType, success,
  } = useSelector((state) => state.trainingCourse)
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
      if (_.isEqual(requestType, REQUEST_TYPES.CREATE)) {
        dispatch(startLoader({
          type: 'progress',
        }))
      } else {
        dispatch(startLoader())
      }
    } else {
      dispatch(stopLoader())
    }
  }, [ isLoading, dispatch, requestType ])

  if (isPreview) {
    return (
      <>
        <AlertPopover
          open={ !_.isEmpty(errors) }
          buttonOnClick={ () => setErrors({}) }
          alertTitle='Oops!'
          alertBody='Please fill in all the required fields first'
        />
        <PreviewCreateCourse
          informationSection={ informationSection }
          contentSection={ contentSection }
          courseContent={ courseContent }
          isPreview={ isPreview }
          course={ course }
          setIsPreview={ setIsPreview }
          updateCourseReducer={ updateCourseReducer }
          handleErrors={ handleErrors }
          isLoading={ isLoading }
          requestType={ requestType }
          success={ success }
          isCreator={ course.isCreator }
        />
      </>
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
        requestType={ requestType }
        success={ success }
      />
    </>
  )
}

export default NewCoursePage
