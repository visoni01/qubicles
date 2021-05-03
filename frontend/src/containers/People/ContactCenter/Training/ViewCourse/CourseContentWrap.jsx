import React, { useState } from 'react'
import CourseContents from './CourseContents'
import CoursePreview from './CoursePreview'
import {
  sectionsPropType, courseIdPropType, isEnrolledPropType, introVideoPropType, courseTitlePropType,
} from './propTypes'

export default function CourseContentWrap({
  sections, courseId, isEnrolled, introVideo, courseTitle,
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

CourseContentWrap.propTypes = {
  sections: sectionsPropType.isRequired,
  courseId: courseIdPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  courseTitle: courseTitlePropType.isRequired,
}
