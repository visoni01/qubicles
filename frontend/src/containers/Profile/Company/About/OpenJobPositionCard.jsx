/* eslint-disable camelcase */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faRedo, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { JOB_ROUTE } from '../../../../routes/routesPath'

const OpenJobPositionCard = ({
  categoryTitle, jobs, fulfilled, inNeed, evaluating, pending, categoryId,
}) => (
  <div className='job-category-card list-divider' key={ categoryId }>
    <div className='section-heading display-inline-flex is-fullwidth'>
      <p className='para light'>
        { categoryTitle }
      </p>
    </div>

    <div className='mt-10'>
      {jobs.length && jobs.map(({
        job_id, title, needed,
      }, index) => (
        <div
          key={ !job_id ? `${ index } ${ title } ${ categoryId }` : `${ job_id } ${ categoryId }` }
          className='list-divider mtb-5'
        >
          <div className='job-info'>
            <div className='job-details is-fullwidth'>
              <Link to={ `${ JOB_ROUTE }/post/${ job_id }` }>
                <h4 className='h4'>
                  { title }
                </h4>
              </Link>
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

OpenJobPositionCard.defaultProps = {
  fulfilled: 0,
  evaluating: 0,
  pending: 0,
  inNeed: 0,
}

OpenJobPositionCard.propTypes = {
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

export default OpenJobPositionCard
