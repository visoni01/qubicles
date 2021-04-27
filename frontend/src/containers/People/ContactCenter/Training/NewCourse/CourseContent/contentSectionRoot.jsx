import React, { useCallback } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import CourseContentSection from './courseContentSection'
import './styles.scss'
import {
  checkDisabledAddSectionButton, addEmptyContentSectionToSections, updateSectionInSections, deleteSectionInSections, checkDeleteSection,
} from './helper'

const ContentSectionRoot = ({
  courseContent, setCourseContent,
}) => {
  const handleAddSectionButton = useCallback(() => {
    setCourseContent((current) => {
      const newSections = addEmptyContentSectionToSections({ sections: current.sections })
      return ({
        ...current,
        sections: newSections,
      })
    })
  }, [ setCourseContent ])

  const updateSection = useCallback(({ section }) => {
    setCourseContent((current) => {
      const updatedSections = updateSectionInSections({ sections: current.sections, updatedSection: section })
      return ({
        ...current,
        sections: updatedSections,
      })
    })
  }, [ setCourseContent ])

  const deleteSection = useCallback(({ section }) => {
    setCourseContent((current) => {
      const updatedSections = deleteSectionInSections({ sections: current.sections, sectionToDelete: section })
      return ({
        ...current,
        sections: updatedSections,
      })
    })
  }, [ setCourseContent ])

  return (
    <div className='content-section'>
      {courseContent.sections.map((section) => (
        <CourseContentSection
          key={ section.id }
          section={ section }
          updateSection={ updateSection }
          deleteSection={ deleteSection }
          isEnableDelete={ checkDeleteSection({ sections: courseContent.sections }) }
        />
      ))}

      <div className='mt-15'>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
          onClick={ handleAddSectionButton }
          disabled={ checkDisabledAddSectionButton({ sections: courseContent.sections }) }
        >
          Add Section
        </Button>
      </div>
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
      units: PropTypes.arrayOf(PropTypes.any).isRequired,
    })),
  }).isRequired,
  setCourseContent: PropTypes.func.isRequired,
}

export default ContentSectionRoot
