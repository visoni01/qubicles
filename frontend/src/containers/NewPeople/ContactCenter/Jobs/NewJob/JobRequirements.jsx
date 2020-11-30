import React, { useState, useEffect, useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'
import MultiSelectChipItems from '../../../MultiSelectChipItems'
import MultiSelectLinkItems from '../../../MultiSelectLinkItems'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import { availableCourses } from '../../constants'

const NewJobRequirements = ({
  newJobData,
  setNewJobData,
  jobFields,
}) => {
  const [ selectedRequiredCourses, setSelectedRequiredCourses ] = useState([])
  const [ selectedRequiredSkills, setSelectedRequiredSkills ] = useState([ ])
  const [ selectedBonusCourses, setSelectedBonusCourses ] = useState([])
  const [ selectedBonusSkills, setSelectedBonusSkills ] = useState([])

  console.log(' newJobData in requirements ', newJobData)
  console.log(' selectedRequiredSkills in requirements ', selectedRequiredSkills)

  // const setSelectedRequiredSkillsCB = useCallback(() => {
  //   setNewJobData((currentNewJobData) => ({
  //     ...currentNewJobData,
  //     jobSkillsData: {
  //       requiredSkills: selectedRequiredSkills.map((skill) => ({
  //         skillPreference: 'required',
  //         skillId: skill.id,
  //         skillName: skill.title,
  //       })),
  //     },
  //   }))
  // }, [ selectedRequiredSkills ])

  // const setBonusSkillsCB = useCallback(() => {
  //   setNewJobData((currentNewJobData) => ({
  //     ...currentNewJobData,
  //     jobSkillsData: {
  //       bonusSkills: selectedBonusSkills.map((skill) => ({
  //         skillPreference: 'plus',
  //         skillId: skill.id,
  //         skillName: skill.title,
  //       })),
  //     },
  //   }))
  // }, [ selectedBonusSkills ])

  const setNewDataCB = () => {
    console.log('WORKED')
    return setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      jobCoursesData: {
        requiredCourses: selectedRequiredCourses.map((course) => ({
          coursePreference: 'required',
          courseId: course.id,
          courseName: course.title,
        })),
        bonusCourses: selectedBonusCourses.map((course) => ({
          coursePreference: 'plus',
          courseId: course.id,
          courseName: course.title,
        })),
      },
      jobSkillsData: {
        requiredSkills: selectedRequiredSkills.map((skill) => ({
          skillPreference: 'required',
          skillId: skill.id,
          skillName: skill.title,
        })),
        bonusSkills: selectedBonusSkills.map((skill) => ({
          skillPreference: 'plus',
          skillId: skill.id,
          skillName: skill.title,
        })),
      },
    }))
  }

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
                // selectedItems={ selectedRequiredSkills }
                // setSelectedItems={ setSelectedRequiredSkills }
                // afterChange={ () => setNewDataCB }
                onChange={ (items) => console.log('ITEMS IN PARENT===', items) }
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
                // selectedItems={ selectedBonusSkills }
                // setSelectedItems={ setSelectedBonusSkills }
                // afterChange={ () => setNewDataCB }
              />
            </div>
          </Grid>
        </Grid>
        <Grid container justify='space-between'>
          <Grid item xs={ 6 }>
            <h4 className='h4 mt-10 mb-10'> Required Courses* </h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectLinkItems
                items={ availableCourses }
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
                items={ availableCourses }
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
  newJobData: PropTypes.shape(PropTypes.any).isRequired,
  jobFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNewJobData: PropTypes.func.isRequired,
}

export default React.memo(NewJobRequirements)
