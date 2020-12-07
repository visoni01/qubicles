import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import navBar from '../../../../hoc/navbar'
import { NewJob } from './NewJob/index'
import '../styles.scss'
import { newJobDetailsFetchStart } from '../../../../redux-saga/redux/actions'

const EditJob = () => {
  const dispatch = useDispatch()
  const { jobDetails } = useSelector((state) => state.newJobDetails)
  const { jobId } = useParams()

  useEffect(() => {
    if (jobId) {
      dispatch(newJobDetailsFetchStart({ jobId }))
    }
  }, [ dispatch, jobId ])

  return (
    <NewJob
      jobsData={ jobDetails }
      jobId={ jobId }
      isEdit
    />
  )
}

export default navBar(EditJob)
