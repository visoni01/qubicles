import React, { useState } from 'react'
import CourseContents from './CourseContents'
import CoursePreview from './CoursePreview'
import {
  sectionsPropType, courseIdPropType, isEnrolledPropType, introVideoPropType, courseTitlePropType, courseStatusPropType,
} from './propTypes'

export default function CourseContentWrap({
  sections, courseId, isEnrolled, introVideo, courseTitle, courseStatus,
}) {
  const [ openCoursePlayer, setOpenCoursePlayer ] = useState(false)
  const [ currentSection, setCurrentSection ] = useState({})
  const [ currentUnit, setCurrentUnit ] = useState({})
  return (
    <>
      <CourseContents
        setOpenCoursePlayer={ setOpenCoursePlayer }
        sections={ sections }
        courseId={ courseId }
        isEnrolled={ isEnrolled }
        introVideo={ introVideo }
        setCurrentSection={ setCurrentSection }
        setCurrentUnit={ setCurrentUnit }
        courseStatus={ courseStatus }
      />
      <CoursePreview
        open={ openCoursePlayer }
        onClose={ () => setOpenCoursePlayer(false) }
        onSubmit={ () => setOpenCoursePlayer(false) }
        sections={ sections }
        courseId={ courseId }
        courseTitle={ courseTitle }
        currentSection={ currentSection }
        currentUnit={ currentUnit }
        isEnrolled={ isEnrolled }
        introVideo={ introVideo }
        setCurrentSection={ setCurrentSection }
        setCurrentUnit={ setCurrentUnit }
        setOpenCoursePlayer={ setOpenCoursePlayer }
      />
    </>
  )
}

CourseContentWrap.defaultProps = {
  courseStatus: '',
}

CourseContentWrap.propTypes = {
  sections: sectionsPropType.isRequired,
  courseId: courseIdPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  courseTitle: courseTitlePropType.isRequired,
  courseStatus: courseStatusPropType,
}
