import React from 'react'
import PropTypes from 'prop-types'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'

export default function ContentTab({
  contentDetails, setContentDetails,
  courseContent, setCourseContent,
}) {
  return (
    <div className='mt-30'>
      <CourseThumbnail
        contentDetails={ contentDetails }
        setContentDetails={ setContentDetails }

      />
      <IntroVideo />
      <CourseContent
        courseContent={ courseContent }
        setCourseContent={ setCourseContent }
      />
    </div>
  )
}

ContentTab.propTypes = {
  contentDetails: PropTypes.shape({}).isRequired,
  setContentDetails: PropTypes.func.isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}
