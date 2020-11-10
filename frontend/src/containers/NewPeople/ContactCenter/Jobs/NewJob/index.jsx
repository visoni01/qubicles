import React, { useCallback, useState } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import NewJobData from './JobData'
import NewJobRequirements from './JobRequirements'
import NewJobDetails from './JobDetails'
import { newNavBar } from '../../../../../hoc/navbar'
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
    requiredSkills: '',
    requiredCourses: '',
    bonusCourses: '',
    bonusSkills: '',
    jobType: 'contract',
    payAmount: '',
    durationType: 'ondemand',
    experienceType: 'entrylevel',
    languages: 'english',
  }

  const dispatch = useDispatch()
  const { jobFields, success } = useSelector((state) => state.newJobDetails)
  const [ newJobData, setNewJobData ] = useState(initialJobDetails)
  const setNewJobDataCB = useCallback((event) => {
    const { name, value } = event.target
    // console.log('name, value ====>>>>', name, value)
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
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            jobFields={ jobFields }
            setNewJobDataCB={ setNewJobDataCB }
          />
        </Grid>
        <Grid item>
          <NewJobRequirements
            newJobData={ newJobData }
            setNewJobDataCB={ setNewJobDataCB }
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

export default newNavBar(NewJob)
