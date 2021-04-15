import React from 'react'
import PropTypes from 'prop-types'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'

export default function ContentTab({
  contentSection, setContentSection,
  courseContent, setCourseContent,
}) {
  return (
    <div className='mt-30'>
      <CourseThumbnail
        contentSection={ contentSection }
        setContentSection={ setContentSection }

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
  contentSection: PropTypes.shape({}).isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: PropTypes.shape({}).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}
