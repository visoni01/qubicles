import React, { useCallback, useState } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import NewJobData from './JobData'
import NewJobRequirements from './JobRequirements'
import NewJobDetails from './JobDetails'
import navBar from '../../../../../hoc/navbar'
import NewJobActions from './Actions'
import '../styles.scss'
import { getNewJobFields } from '../../../../../redux-saga/redux/actions'

const NewJob = () => {
  const initialJobDetails = {
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
    languages: 'english',
  }

  const dispatch = useDispatch()
  const { jobFields } = useSelector((state) => state.newJobDetails)
  const [ newJobData, setNewJobData ] = useState(initialJobDetails)

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

  return (
    <Grid container spacing={ 3 }>
      <Grid container item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 } spacing={ 3 } direction='column'>
        <Grid item>
          <NewJobData
            setNewJobData={ setNewJobData }
            jobFields={ jobFields }
            setNewJobDataCB={ setNewJobDataCB }
          />
        </Grid>
        <Grid item>
          <NewJobRequirements
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
        <NewJobActions newJobData={ newJobData } />
      </Grid>
    </Grid>
  )
}

export default navBar(NewJob)
