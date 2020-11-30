import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box, Grid,
} from '@material-ui/core'
import { jobPostCard } from '../testData'
import JobPostDetails from './JobPostDetails'
import CreatePreviewActions from './NewJob/Actions'
import { newNavBar } from '../../../../hoc/navbar'

const JobPreview = () => {
  const { jobData, isLoading } = useSelector((state) => state.newJobDetails)
  return (
    <>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 9 }>
          <Box className='custom-box job-post-root'>
            <h2 className='h2'> Preview </h2>
            <div className='display-inline-flex is-fullwidth'>
              <h3 className='h3 job-post-heading'>
                {jobData.title}
              </h3>
            </div>
            <JobPostDetails
              courses={ jobPostCard.courses }
              jobDetails={ jobData }
              isLoading={ isLoading }
            />
          </Box>
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <CreatePreviewActions
            newJobData={ jobData }
            isEdit={ false }
            isPreview
          />
        </Grid>
      </Grid>
    </>
  )
}

export default newNavBar(JobPreview)
