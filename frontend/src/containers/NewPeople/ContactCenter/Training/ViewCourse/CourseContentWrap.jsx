import React, { useState } from 'react'
import CourseContents from './CourseContents'
import CoursePreview from './CoursePreview'

export default function CourseContentWrap() {
  const [ openCoursePlayer, setOpenCoursePlayer ] = useState(false)
  return (
    <>
      <CourseContents
        setOpenCoursePlayer={ setOpenCoursePlayer }
      />
      <CoursePreview
        open={ openCoursePlayer }
        onClose={ () => setOpenCoursePlayer(false) }
        onSubmit={ () => setOpenCoursePlayer(false) }
      />
    </>
  )
}
