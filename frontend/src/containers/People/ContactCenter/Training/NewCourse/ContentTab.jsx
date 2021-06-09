import React from 'react'
import PropTypes from 'prop-types'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'
import { contentSectionPropType, courseContentPropType, errorsPropTypes } from './propTypes'

export default function ContentTab({
  contentSection, setContentSection,
  courseContent, setCourseContent, errors,
}) {
  return (
    <div className='mt-30'>
      <CourseThumbnail
        contentSection={ contentSection }
        setContentSection={ setContentSection }
        errors={ errors }
      />
      <IntroVideo
        contentSection={ contentSection }
        setContentSection={ setContentSection }
        errors={ errors }
      />
      <CourseContent
        courseContent={ courseContent }
        setCourseContent={ setCourseContent }
        errors={ errors }
      />
    </div>
  )
}

ContentTab.propTypes = {
  contentSection: contentSectionPropType.isRequired,
  setContentSection: PropTypes.func.isRequired,
  courseContent: courseContentPropType.isRequired,
  setCourseContent: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}
