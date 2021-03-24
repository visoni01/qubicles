import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box, Grid,
} from '@material-ui/core'
import { jobPostCard } from '../../../../containers/People/ContactCenter/testData'
import JobPostDetails from './jobPostDetails'
import CreatePreviewActions from '../../../../containers/People/ContactCenter/Jobs/NewJob/createPreviewActions'

const JobPreview = () => {
  const { createJobData, isUpdatedData, isLoading } = useSelector((state) => state.createJobData)
  return (
    <>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 9 }>
          <Box className='custom-box job-post-root'>
            <h2 className='h2'> Preview </h2>
            <div className='display-inline-flex is-fullwidth'>
              <h3 className='h3 job-post-heading'>
                {createJobData.title}
              </h3>
            </div>
            <JobPostDetails
              courses={ jobPostCard.courses }
              jobDetails={ createJobData }
              isLoading={ isLoading }
            />
          </Box>
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <CreatePreviewActions
            newJobData={ createJobData }
            isEdit={ isUpdatedData }
            isPreview
          />
        </Grid>
      </Grid>
    </>
  )
}

export default JobPreview
