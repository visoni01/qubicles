import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'
import MultiSelectChipItems from '../../../MultiSelectChipItems'
import MultiSelectLinkItems from '../../../MultiSelectLinkItems'
import ROUTE_PATHS from '../../../../../routes/routesPath'

const NewJobRequirements = ({
  newJobData,
  jobFields,
  setNewJobDataCB,
}) => {
  const availableSkills = [
    { id: 1, title: 'How to talk to clients?', subtitle: 'Chris Porter, 2020' },
    { id: 2, title: 'Email Communication', subtitle: 'Chris Porter, 2020' },
    { id: 3, title: 'Managing Difficult Situation', subtitle: 'Roy Gordon, 2020' },
  ]
  const [ requiredCourses, setRequiredCourses ] = useState([])
  const [ requiredSkills, setRequiredSkills ] = useState([])
  const [ bonusCourses, setBonusCourses ] = useState([])
  const [ bonusSkills, setBonusSkills ] = useState([])

  console.log('requiredCourses, requiredSkills', requiredSkills, requiredCourses)

  return (
    <div className='custom-box job-requirements-root has-fullwidth'>
      <h3 className='mt-10 h3'> Requirements </h3>
      <div className='mt-30'>
        <Grid container justify='space-between'>
          <Grid item xs={ 6 }>
            <h4 className='h4 mb-5'> Required Skills* </h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectChipItems
                items={ jobFields.jobSkills.map((item) => ({
                  id: item.value,
                  title: item.name,
                })) }
                selectedItems={ requiredSkills }
                setSelectedItems={ setRequiredSkills }
              />
            </div>
          </Grid>
          <Grid item xs={ 6 }>
            <h4 className='h4 mb-5'> Bonus Skills </h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectChipItems
                items={ jobFields.jobSkills.map((item) => ({
                  id: item.value,
                  title: item.name,
                })) }
                selectedItems={ bonusSkills }
                setSelectedItems={ setBonusSkills }
              />
            </div>
          </Grid>
        </Grid>
        <Grid container justify='space-between'>
          <Grid item xs={ 6 }>
            <h4 className='h4 mt-10 mb-10'> Required Courses* </h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectLinkItems
                items={ availableSkills }
                selectedItems={ requiredCourses }
                setSelectedItems={ setRequiredCourses }
                textLinkBase={ ROUTE_PATHS.VIEW_COURSE }
              />
            </div>
          </Grid>
          <Grid item xs={ 6 }>
            <h4 className='h4 mt-10 mb-10'> Bonus Courses</h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectLinkItems
                items={ availableSkills }
                selectedItems={ bonusCourses }
                setSelectedItems={ setBonusCourses }
                textLinkBase={ ROUTE_PATHS.VIEW_COURSE }
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

NewJobRequirements.propTypes = {
  newJobData: PropTypes.bool.isRequired,
  jobFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNewJobDataCB: PropTypes.func.isRequired,
}

export default NewJobRequirements
