import React from 'react'
import { Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faRedo, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { jobCategoryCardValidator } from './jobsValidator'
import ROUTE_PATHS from '../../../../routes/routesPath'

const JobCategoryCard = ({
  categoryName, jobs,
}) => (
  <div className='job-category-card'>
    <div className='section-heading display-inline-flex is-fullwidth'>
      <h3 className='h3'>
        { categoryName }
      </h3>
    </div>

    <div className='mt-10 mb-30'>
      {jobs.map(({
        jobId, title, required, hired, evaluating, pending,
      }) => (
        <>
          <div className='job-info list-divider' key={ jobId }>
            <div className='job-details is-fullwidth'>
              <Link to={ ROUTE_PATHS.JOB_POST }>
                <h4 className='h4'>
                  { title }
                </h4>
              </Link>
              <div>
                <ul className='action-buttons'>
                  <li>
                    <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
                    <span className='para bold'>{`${ hired }/${ required }`}</span>
                    <span className='para light ml-5'>Hired</span>
                  </li>
                  <li>
                    <FontAwesomeIcon className='custom-fa-icon light' icon={ faRedo } />
                    <span className='para bold'>{evaluating}</span>
                    <span className='para light ml-5'>Evaluating</span>
                  </li>
                  <li>
                    <FontAwesomeIcon className='custom-fa-icon light' icon={ faEnvelope } />
                    <span className='para bold'>{pending}</span>
                    <span className='para light ml-5'>Pending Applications</span>
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
