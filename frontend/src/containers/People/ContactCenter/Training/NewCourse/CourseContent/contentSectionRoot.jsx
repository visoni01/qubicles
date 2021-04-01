import React, { useCallback } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import CourseContentSection from './courseContentSection'

import './styles.scss'

const ContentSectionRoot = ({
  courseContent, setCourseContent,
}) => {
  const handleAddSectionButton = useCallback(() => {
    setCourseContent((current) => ({
      ...current,
      sections: [ ...current.sections, {
        id: current.sections[ current.sections.length - 1 ].id + 1,
        title: 'Section',
        sectionNum: current.sections[ current.sections.length - 1 ].sectionNum + 1,
        sectionIsActive: true,
        units: [],
      } ],
    }))
  }, [ setCourseContent ])

  return (
    <div className='content-section'>
      {courseContent.sections.map((section) => (
        <CourseContentSection
          key={ section.id }
          section={ section }
        />
      ))}

      <Button
        className='wide-button'
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
        onClick={ handleAddSectionButton }
      >
        Add Section
      </Button>
    </div>
  )
}

ContentSectionRoot.propTypes = {
  courseContent: PropTypes.shape({
    sections: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      sectionNum: PropTypes.number.isRequired,
      sectionIsActive: PropTypes.bool.isRequired,
      units: PropTypes.shape(PropTypes.any).isRequired,
    })),
  }).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}

export default ContentSectionRoot
