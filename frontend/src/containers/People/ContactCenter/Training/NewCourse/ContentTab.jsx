import React from 'react'
import PropTypes from 'prop-types'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'

export default function ContentTab({
  contentDetails, setContentDetails,
}) {
  return (
    <div className='mt-30'>
      <CourseThumbnail
        contentDetails={ contentDetails }
        setContentDetails={ setContentDetails }
      />
      <IntroVideo />
      <CourseContent />
    </div>
  )
}

ContentTab.propTypes = {
  contentDetails: PropTypes.shape({}).isRequired,
  setContentDetails: PropTypes.func.isRequired,
}
