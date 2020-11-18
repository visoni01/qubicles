import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'
import MultiSelectChipItems from '../../../MultiSelectChipItems'
import MultiSelectLinkItems from '../../../MultiSelectLinkItems'
import ROUTE_PATHS from '../../../../../routes/routesPath'

const NewJobRequirements = ({
  setNewJobData,
  jobFields,
}) => {
  const availableSkills = [
    { id: 1, title: 'How to talk to clients?', subtitle: 'Chris Porter, 2020' },
    { id: 2, title: 'Email Communication', subtitle: 'Chris Porter, 2020' },
    { id: 3, title: 'Managing Difficult Situation', subtitle: 'Roy Gordon, 2020' },
  ]
  const [ selectedRequiredCourses, setSelectedRequiredCourses ] = useState([])
  const [ selectedRequiredSkills, setSelectedRequiredSkills ] = useState([])
  const [ selectedBonusCourses, setSelectedBonusCourses ] = useState([])
  const [ selectedBonusSkills, setSelectedBonusSkills ] = useState([])

  useEffect(() => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      requiredCourses: selectedRequiredCourses.map((course) => (
        course.id
      )),
      requiredSkills: selectedRequiredSkills.map((skill) => (
        skill.id
      )),
      bonusCourses: selectedBonusCourses.map((course) => (
        course.id
      )),
      bonusSkills: selectedBonusSkills.map((skill) => (
        skill.id
      )),
    }))
  }, [ selectedRequiredCourses, selectedRequiredSkills, selectedBonusCourses, selectedBonusSkills ])

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
                selectedItems={ selectedRequiredSkills }
                setSelectedItems={ setSelectedRequiredSkills }
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
                selectedItems={ selectedBonusSkills }
                setSelectedItems={ setSelectedBonusSkills }
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
                selectedItems={ selectedRequiredCourses }
                setSelectedItems={ setSelectedRequiredCourses }
                textLinkBase={ ROUTE_PATHS.VIEW_COURSE }
              />
            </div>
          </Grid>
          <Grid item xs={ 6 }>
            <h4 className='h4 mt-10 mb-10'> Bonus Courses</h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectLinkItems
                items={ availableSkills }
                selectedItems={ selectedBonusCourses }
                setSelectedItems={ setSelectedBonusCourses }
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
  jobFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNewJobData: PropTypes.func.isRequired,
}

export default NewJobRequirements
