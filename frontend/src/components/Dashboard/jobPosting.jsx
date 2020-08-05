import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import Skeleton from '@material-ui/lab/Skeleton'

const JobPosting = () => {
  const { isLoading, jobPostings } = useSelector((state) => state.jobPosting)
  return (
    <div className='feed-channels'>
      <div className='custom-header'>
        Job Postings
      </div>
      {
        !isLoading && jobPostings.length && jobPostings.map(({ jobTitle, applicants }, index) => (
          <div className='menu-items' key={ `${ jobTitle }-${ applicants }` }>
            <div className='card-background-color'>
              <div className='mb-4 pd-11'>
                <span className='custom-icon'>
                  <FontAwesomeIcon icon={ faSuitcase } className='icon-style' />
                </span>
                <span>
                  <span className='custom-title'>
                    {jobTitle}
                  </span>
                  <div className='sub-heading-size'>
                    {`${ applicants } applications received`}
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))
      }

      {
        isLoading
        && <Skeleton variant='rect' height={ 150 } />
      }
    </div>
  )
}

export default JobPosting
