import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faRedo, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { JOB_POST_ROUTE } from '../../../../routes/routesPath'

const JobCategoryCard = ({
  categoryTitle, jobs, needed, fulfilled, evaluating, pending,
}) => (
  <div className='job-category-card'>
    <div className='section-heading display-inline-flex is-fullwidth'>
      <h3 className='h3'>
        { categoryTitle }
      </h3>
    </div>

    <div className='mt-10 mb-30'>
      {jobs.map(({
        jobId, title,
      }) => (
        <>
          <div className='job-info list-divider' key={ jobId }>
            <div className='job-details is-fullwidth'>
              <Link to={ `${ JOB_POST_ROUTE }/${ jobId }` }>
                <h4 className='h4'>
                  { title }
                </h4>
              </Link>
              <div>
                <ul className='action-buttons display-inline-flex justify-between'>
                  <li>
                    <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
                    <span className='para bold'>{`${ fulfilled }/${ needed }`}</span>
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

JobCategoryCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  needed: PropTypes.isRequired,
  fulfilled: PropTypes.isRequired,
  evaluating: PropTypes.isRequired,
  pending: PropTypes.isRequired,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
}

export default JobCategoryCard
