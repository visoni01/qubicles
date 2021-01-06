/* eslint-disable camelcase */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends, faRedo, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import JobOptions from './JobOptions'

const JobCategoryCard = ({
  categoryTitle, jobs, fulfilled, inNeed, evaluating, pending, categoryId,
}) => (
  <div className='job-category-card' key={ categoryId }>
    <div className='section-heading display-inline-flex is-fullwidth'>
      <h3 className='h3'>
        { categoryTitle }
      </h3>
    </div>

    <div className='mt-10 mb-30'>
      {jobs.length && jobs.map(({
        job_id, title, needed, status,
      }, index) => (
        <div key={ !job_id ? `${ index } ${ title } ${ categoryId }` : `${ job_id } ${ categoryId }` }>
          <div className='job-info list-divider'>
            <div className='job-details is-fullwidth'>

              <h4 className='h4 job-title'>
                <Link to={ `${ JOB_ROUTE }/post/${ job_id }` }>
                  { title }
                  { status === 'draft' ? ' [Draft] ' : null}
                </Link>
                <JobOptions key={ job_id } categoryId={ categoryId } jobId={ job_id } />
              </h4>

              <div>
                <ul className='action-buttons display-inline-flex justify-between'>
                  <li>
                    <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
                    <span className='para bold'>{`${ fulfilled }/${ needed || inNeed }`}</span>
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
        </div>
      ))}
    </div>
  </div>
)

JobCategoryCard.defaultProps = {
  fulfilled: 0,
  evaluating: 0,
  pending: 0,
  inNeed: 0,
}

JobCategoryCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  fulfilled: PropTypes.number,
  evaluating: PropTypes.number,
  pending: PropTypes.number,
  inNeed: PropTypes.number,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
}

export default JobCategoryCard
