import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NewJob from './NewJob/index'
import '../styles.scss'
import { jobDetailsFetchStart } from '../../../../redux-saga/redux/actions'

const EditJob = () => {
  const { jobDetails } = useSelector((state) => state.jobDetails)
  const { isUpdatedData } = useSelector((state) => state.createJobData)

  const dispatch = useDispatch()
  const { jobId } = useParams()

  useEffect(() => {
    if (jobId && !isUpdatedData) {
      dispatch(jobDetailsFetchStart({ jobId }))
    }
  }, [ dispatch, jobId, isUpdatedData ])

  return (
    <NewJob
      jobsData={ jobDetails }
      jobId={ jobId }
      isEdit
    />
  )
}

export default EditJob
