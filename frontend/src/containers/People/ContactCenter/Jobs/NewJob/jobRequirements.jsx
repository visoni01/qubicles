import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'
import MultiSelectChipItems from '../../../../Shared/multiSelectChipItems'
import MultiSelectLinkItems from '../../../../Shared/multiSelectLinkItems'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { availableCourses } from '../../constants'

const NewJobRequirements = ({
  newJobData,
  setNewJobData,
  jobFields,
}) => {
  const setRequiredSkillsCB = useCallback((items) => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      jobSkillsData: {
        ...currentNewJobData.jobSkillsData,
        requiredSkills: items.map((skill) => ({
          skillPreference: 'required',
          skillId: skill.id,
          skillName: skill.title,
        })),
      },
    }))
    // eslint-disable-next-line
  }, [])

  const setBonusSkillsCB = useCallback((items) => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      jobSkillsData: {
        ...currentNewJobData.jobSkillsData,
        bonusSkills: items.map((skill) => ({
          skillPreference: 'plus',
          skillId: skill.id,
          skillName: skill.title,
        })),
      },
    }))
    // eslint-disable-next-line
  }, [ ])

  const setRequiredCoursesCB = useCallback((items) => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      jobCoursesData: {
        ...currentNewJobData.jobCoursesData,
        requiredCourses: items.map((course) => ({
          coursePreference: 'required',
          courseId: course.id,
          courseName: course.title,
        })),
      },
    }))
    // eslint-disable-next-line
  }, [])

  const setBonusCoursesCB = useCallback((items) => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      jobCoursesData: {
        ...currentNewJobData.jobCoursesData,
        bonusCourses: items.map((course) => ({
          coursePreference: 'plus',
          courseId: course.id,
          courseName: course.title,
        })),
      },
    }))
    // eslint-disable-next-line
  }, [])

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
                initialData={ newJobData.jobSkillsData.requiredSkills.map((skill) => (
                  {
                    id: skill.skillId,
                    title: skill.skillName,
                  })) }
                onChange={ (items) => setRequiredSkillsCB(items) }
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
                initialData={ newJobData.jobSkillsData.bonusSkills.map((skill) => (
                  {
                    id: skill.skillId,
                    title: skill.skillName,
                  })) }
                onChange={ (items) => setBonusSkillsCB(items) }
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
                textLinkBase={ `${ VIEW_COURSE_ROUTE }/1` }
                onChange={ (items) => setRequiredCoursesCB(items) }
              />
            </div>
          </Grid>
          <Grid item xs={ 6 }>
            <h4 className='h4 mt-10 mb-10'> Bonus Courses</h4>
            <div className='mr-30 drop-down-field'>
              <MultiSelectLinkItems
                items={ availableCourses }
                textLinkBase={ `${ VIEW_COURSE_ROUTE }/1` }
                onChange={ (items) => setBonusCoursesCB(items) }
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

NewJobRequirements.defaultProps = {
  newJobData: {
    jobId: '',
    categoryId: '',
    categoryName: '',
    needed: 0,
    title: '',
    description: '',
    status: 'recruiting',
    jobType: 'contract',
    payAmount: 0,
    durationType: 'on-demand',
    durationMonths: 0,
    experienceType: 'entry',
    employmentType: 'freelancer',
    languages: 'english',
    jobSkillsData: {
      requiredSkills: [],
      bonusSkills: [ ],
    },
    jobCoursesData: {
      requiredCourses: [],
      bonusCourses: [ ],
    },
  },
}

NewJobRequirements.propTypes = {
  newJobData: PropTypes.shape(PropTypes.any),
  jobFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNewJobData: PropTypes.func.isRequired,
}

export default React.memo(NewJobRequirements)
