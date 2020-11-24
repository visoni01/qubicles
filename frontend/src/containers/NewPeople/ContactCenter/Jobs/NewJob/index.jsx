import React, { useCallback, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import NewJobData from './JobData'
import NewJobRequirements from './JobRequirements'
import NewJobDetails from './JobDetails'
import navBar from '../../../../../hoc/navbar'
import NewJobActions from './Actions'
import '../styles.scss'
import { getNewJobFields, newJobDetailsFetchStart } from '../../../../../redux-saga/redux/actions'

const NewJob = ({ jobData, jobId, isEdit }) => {
  // const initialJobDetails = {
  //   jobId: '',
  //   categoryId: '',
  //   needed: '',
  //   title: '',
  //   description: '',
  //   status: 'recruiting',
  //   jobType: 'contract',
  //   payAmount: '',
  //   durationType: 'on-demand',
  //   durationMonths: 0,
  //   experienceType: 'entry',
  //   languages: 'english',
  // }

  const dispatch = useDispatch()
  const [ newJobData, setNewJobData ] = useState({ ...jobData })
  const { jobFields, jobDetails, success } = useSelector((state) => state.newJobDetails)

  console.log(' jobData, jobId, isEdit in index  ====>>>>>', jobData, jobId)

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

  useEffect(() => (
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      ...jobData,
    }))
  ), [])

  console.log(' newJobData in index ***** ====>>>>>', newJobData)

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
        <NewJobActions newJobData={ newJobData } isEdit={ isEdit } />
      </Grid>
    </Grid>
  )
}

NewJob.defaultProps = {
  jobData: {
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
  },
  jobId: '',
  isEdit: false,
}

NewJob.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobData: PropTypes.object,
  jobId: PropTypes.number,
  isEdit: PropTypes.bool,
}

export default navBar(NewJob)
