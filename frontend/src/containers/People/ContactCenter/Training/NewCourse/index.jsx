import React, {
  useCallback, useEffect, useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTrainingCourseDetails } from '../../../../../redux-saga/redux/people'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'
import PreviewCreateCourse from './previewCourse'
import CreateCourse from './createCourse'
import './styles.scss'

const NewCoursePage = () => {
  const { course, isLoading } = useSelector((state) => state.trainingCourse)
  const [ informationSection, setInformationSection ] = useState(course.informationSection)
  const [ contentSection, setContentSection ] = useState(course.contentSection)
  const [ courseContent, setCourseContent ] = useState(course.courseContent)
  const [ isPreview, setIsPreview ] = useState(false)

  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

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
    />
  )
}

export default NewCoursePage
