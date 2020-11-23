import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import NewJob from './NewJob/index'
import { newNavBar } from '../../../../hoc/navbar'
import '../styles.scss'
import { newJobDetailsFetchStart } from '../../../../redux-saga/redux/actions'

const EditJob = () => {
  const dispatch = useDispatch()
  const { jobDetails, success } = useSelector((state) => state.newJobDetails)
  // const [ editJobData, setEditJobData ] = useState(jobDetails)

  const { jobId } = useParams()
  console.log(' jobId in editJob ', jobId)
  console.log(' jobDetails in editJob ', jobDetails)

  // setNewJobData((currentNewJobData) => ({
  //   ...currentNewJobData,
  //   ...jobDetails,
  // }))

  useEffect(() => {
    if (_.isEmpty(jobDetails) && !_.isEmpty(jobId)) {
      dispatch(newJobDetailsFetchStart({ jobId }))
    }
  }, [ dispatch ])

  return (
    <NewJob
      jobData={ jobDetails }
      jobId={ jobId }
      isEdit
    />
  )
}

export default EditJob
