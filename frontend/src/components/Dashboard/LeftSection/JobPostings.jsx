import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'

const JobPostings = () => {
  const { isLoading, jobPostings } = useSelector((state) => state.jobPosting)
  return (
    <Box className='custom-box'>
      <div className='job-postings'>
        <h3 className='h3 mb-15'>
          Job Postings
        </h3>

        <ul className='job-list'>
          {!isLoading && jobPostings.length && jobPostings.map(({ jobTitle, applicants }, index) => (
            <li className='job-item' key={ `${ jobTitle }-${ applicants }` }>
              <h4 className='h4 job-title'>{jobTitle}</h4>
              <p className='para applicants mb-10'>
                <b>{` ${ applicants } `}</b>
                <span className='text'>applications received</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  )
}

export default JobPostings
