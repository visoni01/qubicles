import React from 'react'
import PropTypes from 'prop-types'
import ContentSectionRoot from './contentSectionRoot'

export default function CourseContent({
  courseContent, setCourseContent,
}) {
  console.log('COURSE CONTENT==', courseContent)
  return (
    <div className='content-tab-section'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'> Course Content </h3>
          <p className='para'>
            {`Start building your course
            by creating sections, units and tests`}
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
