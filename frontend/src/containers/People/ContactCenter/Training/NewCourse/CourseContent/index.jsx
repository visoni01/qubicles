import React from 'react'
import PropTypes from 'prop-types'
import ContentSectionRoot from './contentSectionRoot'

export default function CourseContent({
  courseContent, setCourseContent,
}) {
  return (
    <div className='content-tab-section'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'> Course Content </h3>
          <p className='para'>
            {`Start building your course
            by creating Sections, Units and Tests`}
          </p>
          <p className='para mt-10'>
            {`A section must have minimum one
            Unit and exactly one Test`}
          </p>
        </div>
        <ContentSectionRoot
          courseContent={ courseContent }
          setCourseContent={ setCourseContent }
        />
      </div>
    </div>
  )
}

CourseContent.propTypes = {
  courseContent: PropTypes.shape({}).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}
