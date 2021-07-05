import React, { useCallback, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import JobData from './jobData'
import JobRequirements from './jobRequirements'
import JobDetails from './jobDetails'
import CreatePreviewActions from './createPreviewActions'
import '../styles.scss'
import { getNewJobFields } from '../../../../../redux-saga/redux/actions'
import { jobDetailsPropTypes } from '../jobsValidator'
import checkAndSetErrors from './checkAndSetErrors'
import AlertPopover from '../../../../../components/CommonModal/alertPopover'

const NewJob = (props) => {
  const { jobsData, jobId, isEdit } = props
  const dispatch = useDispatch()
  const defaultJobData = {
    jobId: null,
    categoryId: null,
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
  const [ errors, setErrors ] = useState({})

  const handleErrors = useCallback(({ status }) => (
    checkAndSetErrors({ setErrors, newJobData, status })
  ), [ newJobData ])

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
    <>
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
              errors={ errors }
            />
          </Grid>
          <Grid item>
            <JobRequirements
              newJobData={ newJobData }
              setNewJobData={ setNewJobData }
              jobFields={ jobFields }
              errors={ errors }
            />
          </Grid>
          <Grid item>
            <JobDetails
              newJobData={ newJobData }
              setNewJobData={ setNewJobData }
              setNewJobDataCB={ setNewJobDataCB }
              errors={ errors }
            />
          </Grid>
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          <CreatePreviewActions
            newJobData={ newJobData }
            isEdit={ isEdit }
            isPreview={ false }
            jobId={ jobId }
            handleErrors={ handleErrors }
          />
        </Grid>
      </Grid>
      <AlertPopover
        open={ !_.isEmpty(errors) }
        buttonOnClick={ () => setErrors({}) }
        alertTitle='Oops!'
        alertBody='Please fill in all the required fields first'
      />
    </>
  )
}

NewJob.defaultProps = {
  jobsData: {
    jobId: null,
    categoryId: null,
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
  jobsData: jobDetailsPropTypes,
  jobId: PropTypes.string,
  isEdit: PropTypes.bool,
}

export default NewJob
