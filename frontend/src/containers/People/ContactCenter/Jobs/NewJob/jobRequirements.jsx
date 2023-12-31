import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import MultiSelectChipItems from '../../../../Shared/multiSelectChipItems'
import RequiredCoursesField from '../../../Shared/requiredCoursesField'
import { jobDetailsPropTypes } from '../jobsValidator'
import errorsPropTypes from './errorsPropTypes'
import '../styles.scss'

const NewJobRequirements = ({
  newJobData, setNewJobData, jobFields, errors,
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
          courseTitle: course.title,
          courseImage: course.image,
          creatorName: course.creatorName,
          createdAt: course.createdAt,
          subtitle: course.subtitle,
        })),
      },
    }))
  }, [ setNewJobData ])

  const setBonusCoursesCB = useCallback((items) => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      jobCoursesData: {
        ...currentNewJobData.jobCoursesData,
        bonusCourses: items.map((course) => ({
          coursePreference: 'plus',
          courseId: course.id,
          courseTitle: course.title,
          courseImage: course.image,
          creatorName: course.creatorName,
          createdAt: course.createdAt,
          subtitle: course.subtitle,
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
                error={ errors && !!errors.requiredSkills }
                helperText={ errors && errors.requiredSkills ? errors.requiredSkills.message : '' }
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
            <h4 className='h4 mt-10 mb-5'> Required Courses* </h4>
            <div className='mr-30 drop-down-field'>
              <RequiredCoursesField
                selectedCourses={ newJobData.jobCoursesData.requiredCourses }
                setSelectedCourses={ setRequiredCoursesCB }
                coursesType='requiredCourses'
                error={ errors && !!errors.requiredCourses }
                helperText={ errors && errors.requiredCourses ? errors.requiredCourses.message : '' }
              />
            </div>
          </Grid>
          <Grid item xs={ 6 }>
            <h4 className='h4 mt-10 mb-5'> Bonus Courses </h4>
            <div className='mr-30 drop-down-field'>
              <RequiredCoursesField
                selectedCourses={ newJobData.jobCoursesData.bonusCourses }
                setSelectedCourses={ setBonusCoursesCB }
                coursesType='bonusCourses'
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
  newJobData: jobDetailsPropTypes,
  jobFields: jobDetailsPropTypes.isRequired,
  setNewJobData: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}

export default React.memo(NewJobRequirements)
