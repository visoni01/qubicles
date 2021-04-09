import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ContactCenterIntro from './contactCenterIntro'
import { jobPostCard } from '../testData'
import JobPost from './jobPost'
import TopTalent from '../Talent/topTalent'
import './styles.scss'
import { jobDetailsFetchStart } from '../../../../redux-saga/redux/actions'

const JobView = () => {
  let { jobId } = useParams()
  jobId = parseInt(jobId, 10)
  const { jobDetails, isLoading } = useSelector((state) => state.jobDetails)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(jobDetailsFetchStart({ jobId }))
  }, [ dispatch, jobId ])

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <ContactCenterIntro
          key={ jobId }
          jobDetails={ jobDetails }
        />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <JobPost
          key={ jobId }
          jobId={ jobId }
          jobDetails={ jobDetails }
          isLoading={ isLoading }
          courses={ jobPostCard.courses }
        />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TopTalent heading='Suggestions For This Job' />
      </Grid>
    </Grid>
  )
}

export default JobView