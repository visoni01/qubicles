import React from 'react'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'

export default function ContentTab() {
  return (
    <div className='mt-30'>
      <CourseThumbnail />
      <IntroVideo />
      <CourseContent />
    </div>
  )
}
