import React, { useCallback, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import JobData from './JobData'
import JobRequirements from './JobRequirements'
import JobDetails from './JobDetails'
import navBar from '../../../../../hoc/navbar'
import CreatePreviewActions from './Actions'
import '../styles.scss'
import { getNewJobFields } from '../../../../../redux-saga/redux/actions'

export const NewJob = (props) => {
  const { jobsData, jobId, isEdit } = props
  const dispatch = useDispatch()
  const defaultJobData = {
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
  }
  const [ newJobData, setNewJobData ] = useState(defaultJobData)
  const { jobFields } = useSelector((state) => state.jobDetails)
  const { createJobData } = useSelector((state) => state.createJobData)

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
  useEffect(() => {
    if (!(jobFields.jobTitles && jobFields.jobTitles.length)) {
      dispatch(getNewJobFields())
    }
  }, [ jobFields, dispatch ])

  useEffect(() => {
    if (isEdit) {
      setNewJobData((currentNewJobData) => ({
        ...currentNewJobData,
        ...jobsData,
      }))
    }
  }, [ isEdit, jobsData ])

  useEffect(() => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      ...createJobData,
    }))
  }, [ createJobData ])

  return (
    <Grid container spacing={ 3 }>
      <Grid container item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 } spacing={ 3 } direction='column'>
        <Grid item>
          <JobData
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            jobFields={ jobFields }
            setNewJobDataCB={ setNewJobDataCB }
            jobId={ jobId }
            isEdit={ isEdit }
          />
        </Grid>
        <Grid item>
          <JobRequirements
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            jobFields={ jobFields }
          />
        </Grid>
        <Grid item>
          <JobDetails
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            setNewJobDataCB={ setNewJobDataCB }
          />
        </Grid>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <CreatePreviewActions
          newJobData={ newJobData }
          isEdit={ isEdit }
          isPreview={ false }
          jobId={ jobId }
        />
      </Grid>
    </Grid>
  )
}

NewJob.defaultProps = {
  jobsData: {
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
  jobId: '',
  isEdit: false,
}

NewJob.propTypes = {
  jobsData: PropTypes.shape(PropTypes.any),
  jobId: PropTypes.number,
  isEdit: PropTypes.bool,
}

export default navBar(NewJob)
