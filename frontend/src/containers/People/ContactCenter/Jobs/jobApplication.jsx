/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { jobApplicationListRequestStart } from '../../../../redux-saga/redux/actions'
import JobApplicationBox from '../../../../components/People/ContactCenter/Jobs/jobApplicationBox'
import { REQUEST_TYPES } from '../../../../utils/constants'
import './styles.scss'

const JobApplication = ({ jobId }) => {
  const { applicationsData, isLoading, success } = useSelector((state) => state.jobApplicationList)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && !success) {
      dispatch(jobApplicationListRequestStart({
        applicationListData: {
          jobId,
        },
        requestType: REQUEST_TYPES.FETCH,
        applicationType: 'job',
      }))
    }
    // eslint-disable-next-line
  }, [ dispatch, jobId ])

  return (
    <>
      {!_.isEmpty(applicationsData) && (Object.keys(applicationsData.jobApplications).map((category) => (
        <JobApplicationBox
          key={ category }
          applicationList={ applicationsData.jobApplications[ category ] }
          categoryName={ category }
        />
      )))}
    </>
  )
}

JobApplication.propTypes = {
  jobId: PropTypes.number.isRequired,
}

export default JobApplication
