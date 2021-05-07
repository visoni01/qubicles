import React from 'react'
import PropTypes from 'prop-types'
import ContentSectionRoot from './contentSectionRoot'
import { courseContentPropType, errorsPropTypes } from '../propTypes'

export default function CourseContent({
  courseContent, setCourseContent, errors,
}) {
  return (
    <div className='content-tab-section'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'> Course Content </h3>
          <span className='para red'>{errors && errors.sections && errors.sections.message}</span>
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
  courseContent: courseContentPropType.isRequired,
  setCourseContent: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}
