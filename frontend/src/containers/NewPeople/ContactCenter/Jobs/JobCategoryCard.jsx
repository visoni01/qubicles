import React from 'react'
import { Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faRedo, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { jobCategoryCardValidator } from './jobsValidator'

const JobCategoryCard = ({
  categoryName, jobs,
}) => (
  <div className='job-category-card'>
    <div className='section-heading display-inline-flex is-fullwidth'>
      <h3 className='section-title'>
        { categoryName }
      </h3>
    </div>

    <div className='mt-10 mb-30'>
      {jobs.map(({
        jobId, title, required, hired, evaluating, pending,
      }) => (
        <>
          <div className='display-inline-flex job-info is-fullwidth mb-10' key={ jobId }>
            <div className='job-details is-fullwidth'>
              <Typography className='job-title'>
                { title }
              </Typography>
              <div>
                <ul className='action-buttons'>
                  <li>
                    <FontAwesomeIcon className='action-icon' icon={ faUserFriends } />
                    <span className='icon-value'>{`${ hired }/${ required }`}</span>
                    <span className='icon-title'>Hired</span>
                  </li>
                  <li>
                    <FontAwesomeIcon className='action-icon' icon={ faRedo } />
                    <span className='icon-value'>{evaluating}</span>
                    <span className='icon-title'>Evaluating</span>
                  </li>
                  <li>
                    <FontAwesomeIcon className='action-icon' icon={ faEnvelope } />
                    <span className='icon-value'>{pending}</span>
                    <span className='icon-title'>Pending Applications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  </div>
)

JobCategoryCard.propTypes = jobCategoryCardValidator
export default JobCategoryCard
