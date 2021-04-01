import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import SectionOptions from './sectionOptions'
import InitialContent from './initialContent'
import AddedContent from './addedContent'

const CourseContentSection = ({
  section,
}) => (
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
      <InitialContent />
      {section.units.map((unit) => (
        <AddedContent
          key={ unit.unitId }
          unit={ unit }
        />
      ))}
      {/* <TestSection /> */}
    </div>
    <SectionOptions />
  </div>
)

CourseContentSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    sectionNum: PropTypes.number.isRequired,
    sectionIsActive: PropTypes.bool.isRequired,
    units: PropTypes.shape(PropTypes.any).isRequired,
  }).isRequired,
}

export default CourseContentSection
