import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { jobPostingDataFetchingStart } from '../../../../redux-saga/redux/actions'

const JobPostings = () => {
  const { isLoading, jobPostings } = useSelector((state) => state.jobPosting)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(jobPostingDataFetchingStart())
  }, [ dispatch ])

  return (
    <Box className='custom-box'>
      <div className='job-postings'>
        <h3 className='h3 mb-15'> Job Postings </h3>

        <ul className='job-list'>
          {!isLoading && jobPostings.length && jobPostings.map(({ jobTitle, applicants }) => (
            <li className='job-item' key={ `${ jobTitle }-${ applicants }` }>
              <h4 className='h4 job-title'>{jobTitle}</h4>
              <p className='para applicants mb-10'>
                <b>{` ${ applicants } `}</b>
                <span className='text'> applications received </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  )
}

export default JobPostings
