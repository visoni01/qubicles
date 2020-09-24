import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'

const JobPostings = () => {
  const { isLoading, jobPostings } = useSelector((state) => state.jobPosting)
  return (
    <Box className='box'>
      <div className='posting-section'>
        <h3 className='mb-3 heading'>
          Job Postings
        </h3>

        <ul className='m-0 p-0'>
          {!isLoading && jobPostings.length && jobPostings.map(({ jobTitle, applicants }, index) => (
            <li key={ `${ jobTitle }-${ applicants }` }>
              <p className='m-0'><b>{jobTitle}</b></p>
              <p className='m-0'>
                <b>{` ${ applicants } `}</b>
                applications received
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  )
}

export default JobPostings
