import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box, Grid,
} from '@material-ui/core'
import _ from 'lodash'
import JobPostDetails from '../../../../components/People/ContactCenter/Jobs/jobPostDetails'
import CreatePreviewActions from './NewJob/createPreviewActions'
import checkAndSetErrors from './NewJob/checkAndSetErrors'
import AlertPopover from '../../../../components/CommonModal/alertPopover'

const JobPreview = () => {
  const { createJobData, isUpdatedData, isLoading } = useSelector((state) => state.createJobData)
  const [ errors, setErrors ] = useState({})

  const handleErrors = useCallback(({ status }) => (
    checkAndSetErrors({ setErrors, newJobData: createJobData, status })
  ), [ createJobData ])

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

export default JobPreview
