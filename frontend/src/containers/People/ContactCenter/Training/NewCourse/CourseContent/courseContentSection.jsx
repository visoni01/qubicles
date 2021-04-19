import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import SectionOptions from './sectionOptions'
import AddedContent from './addedContent'
import TestSection from './Test/testSection'
import {
  addNewUnitToSection, addNewTestToSection, deleteUnitFromSection,
} from './helper'

const CourseContentSection = ({
  section, updateSection,
}) => {
  const handleAddUnitButton = useCallback(() => {
    const updatedSection = addNewUnitToSection({ section })
    updateSection({
      section: updatedSection,
    })
  }, [ updateSection, section ])

  const handleAddTestButton = useCallback(() => {
    const updatedSection = addNewTestToSection({ section })
    updateSection({
      section: updatedSection,
    })
  }, [ updateSection, section ])

  const handleDeleteUnitButton = useCallback(({ unit }) => {
    const updatedSection = deleteUnitFromSection({ section, unitToDelete: unit })
    updateSection({
      section: updatedSection,
    })
  }, [ updateSection, section ])

  return (
    <div>
      <div className='list-sections border-1'>
        <div className='list-item'>
          <Grid container justify='space-between'>
            <Grid item>
              <span className='para'>
                <b>
                  {`${ section.title }`}
                </b>
              </span>
            </Grid>
            <Grid item>
              <span className='para'>
                {section.units.length}
                {' Units'}
              </span>
            </Grid>
          </Grid>
        </div>

        {section.units.map((unit) => (
          unit.type === 'Test' ? (
            <TestSection
              key={ unit.unitId }
              unit={ unit }
              section={ section }
              updateSection={ updateSection }
              handleDeleteUnitButton={ handleDeleteUnitButton }
            />
          ) : (
            <AddedContent
              key={ unit.unitId }
              unit={ unit }
              section={ section }
              updateSection={ updateSection }
              handleDeleteUnitButton={ handleDeleteUnitButton }
            />
          )
        ))}

      </div>
      <SectionOptions
        units={ section.units }
        handleAddUnitButton={ handleAddUnitButton }
        handleAddTestButton={ handleAddTestButton }
      />
    </div>
  )
}

CourseContentSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    sectionNum: PropTypes.number.isRequired,
    sectionIsActive: PropTypes.bool.isRequired,
    units: PropTypes.arrayOf(PropTypes.any).isRequired,
    idx: PropTypes.number.isRequired,
  }).isRequired,
  updateSection: PropTypes.func.isRequired,
}

export default CourseContentSection
