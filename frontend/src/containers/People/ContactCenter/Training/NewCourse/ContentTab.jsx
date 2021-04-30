import React from 'react'
import PropTypes from 'prop-types'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'
import { contentSectionPropType, courseContentPropType } from './propTypes'

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
  contentSection: contentSectionPropType.isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: courseContentPropType.isRequired,
  setCourseContent: PropTypes.func.isRequired,
}
