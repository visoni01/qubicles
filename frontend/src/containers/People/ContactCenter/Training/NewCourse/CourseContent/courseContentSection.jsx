import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import SectionOptions from './sectionOptions'
import AddedContent from './addedContent'
import TestSection from './Test/testSection'
import {
  addNewUnitToSection, addNewTestToSection, deleteUnitFromSection, getArticleUnitsCount,
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

  const handleDeleteTestButton = useCallback(() => {
    updateSection({
      section: { ...section, test: {} },
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
                {`${ getArticleUnitsCount({ section }) } Units`}
              </span>
            </Grid>
          </Grid>
        </div>

        {/* Section Units (Audio, Video, Article) */}
        {section.units.map((unit) => (
          <AddedContent
            key={ unit.unitId }
            unit={ unit }
            section={ section }
            updateSection={ updateSection }
            handleDeleteUnitButton={ handleDeleteUnitButton }
          />
        ))}

        {/* Section Test */}
        {!_.isEmpty(section.test) && (
          <TestSection
            test={ section.test }
            section={ section }
            updateSection={ updateSection }
            handleDeleteTestButton={ handleDeleteTestButton }
          />
        )}

      </div>
      <SectionOptions
        units={ section.units }
        test={ section.test }
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
    test: PropTypes.shape({}).isRequired,
  }).isRequired,

  updateSection: PropTypes.func.isRequired,
}

export default CourseContentSection
