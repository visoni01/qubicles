import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
// import './style.scss'

const JobPostings = () => {
  const { isLoading, jobPostings } = useSelector((state) => state.jobPosting)
  return (
    <Box className='box'>
      <div className='job-postings'>
        <h3 className='heading'>
          Job Postings
        </h3>

        <ul className='job-list'>
          {!isLoading && jobPostings.length && jobPostings.map(({ jobTitle, applicants }, index) => (
            <li className='job-item' key={ `${ jobTitle }-${ applicants }` }>
              <p className='title'><b>{jobTitle}</b></p>
              <p className='applicants'>
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
