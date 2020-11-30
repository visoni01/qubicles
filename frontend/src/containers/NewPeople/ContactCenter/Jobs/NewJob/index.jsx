import React, { useCallback, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import NewJobData from './JobData'
import NewJobRequirements from './JobRequirements'
import NewJobDetails from './JobDetails'
import navBar from '../../../../../hoc/navbar'
import NewJobActions from './Actions'
import '../styles.scss'
import { getNewJobFields } from '../../../../../redux-saga/redux/actions'

const NewJob = (props) => {
  const { jobsData, jobId, isEdit } = props
  const dispatch = useDispatch()
  const defaultJobData = {
    jobId: '',
    categoryId: '',
    needed: '',
    title: '',
    description: '',
    status: 'recruiting',
    jobType: 'contract',
    payAmount: '',
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
  }
  const [ newJobData, setNewJobData ] = useState(defaultJobData)
  const { jobFields, jobDetails, jobData } = useSelector((state) => state.newJobDetails)

  console.log('New job data in index===', newJobData)

  // Setting jobData
  const setNewJobDataCB = useCallback((event) => {
    event.persist()
    const { name, value } = event.target
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      [ name ]: value,
    }))
  }, [ ])

  // Fetching job fields i.e. job categories, titles and skills to select.
  if (!(jobFields.jobTitles && jobFields.jobTitles.length)) {
    dispatch(getNewJobFields())
  }

  useEffect(() => {
    // if(true)
    if (isEdit) {
      setNewJobData((currentNewJobData) => ({
        ...currentNewJobData,
        // ...jobsData,
        ...jobDetails,
      }))
    }
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      ...jobData,
    }))
  }, [ jobData, jobDetails ])

  return (
    <Grid container spacing={ 3 }>
      <Grid container item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 } spacing={ 3 } direction='column'>
        <Grid item>
          <NewJobData
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            jobFields={ jobFields }
            setNewJobDataCB={ setNewJobDataCB }
            jobId={ jobId }
          />
        </Grid>
        <Grid item>
          <NewJobRequirements
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            jobFields={ jobFields }
          />
        </Grid>
        <Grid item>
          <NewJobDetails
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            setNewJobDataCB={ setNewJobDataCB }
          />
        </Grid>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <NewJobActions newJobData={ newJobData } isEdit={ isEdit } isPreview={ false } />
      </Grid>
    </Grid>
  )
}

NewJob.defaultProps = {
  jobsData: {
    jobId: '',
    categoryId: '',
    needed: '',
    title: '',
    description: '',
    status: 'recruiting',
    jobType: 'contract',
    payAmount: '',
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
  jobId: '',
  isEdit: false,
}

NewJob.propTypes = {
  jobsData: PropTypes.shape(PropTypes.any),
  jobId: PropTypes.number,
  isEdit: PropTypes.bool,
}

export default navBar(NewJob)
