import React from 'react'
import PropTypes from 'prop-types'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'

export default function ContentTab({
  contentSection, setContentSection,
  courseContent, setCourseContent, thumbnailImageRef,
}) {
  return (
    <div className='mt-30'>
      <CourseThumbnail
        contentSection={ contentSection }
        setContentSection={ setContentSection }
        thumbnailImageRef={ thumbnailImageRef }
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
  thumbnailImageRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
}
