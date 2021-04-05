import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import SectionOptions from './sectionOptions'
import AddedContent from './addedContent'
import { addNewUnitToSection } from './helper'

const CourseContentSection = ({
  section, updateSection,
}) => {
  const handleAddUnitButton = useCallback(() => {
    const updatedSection = addNewUnitToSection({ section })
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
                  {`${ section.title } ${ section.sectionNum }`}
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
          <AddedContent
            key={ unit.unitId }
            unit={ unit }
            section={ section }
            updateSection={ updateSection }
          />
        ))}
        {/* <TestSection /> */}
      </div>
      <SectionOptions
        units={ section.units }
        handleAddUnitButton={ handleAddUnitButton }
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
    units: PropTypes.shape(PropTypes.any).isRequired,
  }).isRequired,
  updateSection: PropTypes.func.isRequired,
}

export default CourseContentSection
