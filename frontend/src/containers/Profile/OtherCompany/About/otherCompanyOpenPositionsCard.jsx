/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends, faCalendar, faBriefcase, faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import _ from 'lodash'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import { checkJobType } from '../../../../utils/common'
import '../styles.scss'

const OpenJobPositionCard = ({
  categoryTitle, jobs, fulfilled, inNeed, categoryId,
}) => {
  const history = useHistory()

  const handleViewJobPost = (job_id) => {
    history.push(`${ JOB_ROUTE }/post/${ job_id }`)
  }
  return (
    <div className='job-category-card list-divider' key={ categoryId }>
      <div className='section-heading display-inline-flex is-fullwidth'>
        <p className='para light'>
          { categoryTitle }
        </p>
      </div>

      <div className='mt-5'>
        {jobs.length && jobs.map(({
          job_id, title, needed, job_type, duration_months, duration_type,
          description, pay_amount,
        }, index) => (
          <div
            key={ !job_id ? `${ index } ${ title } ${ categoryId }` : `${ job_id } ${ categoryId }` }
            className='list-divider mtb-5'
          >
            <div className='job-info'>
              <div className='job-details is-fullwidth '>
                <div className='other-company-title display-inline-flex justify-between'>
                  <h4 className='h4'>
                    { title }
                  </h4>
                  <Button
                    classes={ {
                      root: 'button-primary-text',
                      label: 'button-primary-text-label',
                    } }
                    onClick={ () => handleViewJobPost(job_id) }
                  >
                    View Job Post
                  </Button>
                </div>
                <div className='mt-5'>
                  <p className='para short-description' dangerouslySetInnerHTML={ { __html: description } } />
                </div>
                <div className='mt-10'>
                  <ul className='action-buttons display-inline-flex justify-between'>
                    <li>
                      <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
                      <span className='para bold'>{`${ fulfilled }/${ needed || inNeed }`}</span>
                      <span className='para light ml-5'>Hired</span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='custom-fa-icon light' icon={ faBriefcase } />
                      <span className='para light'>{checkJobType(job_type)}</span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='custom-fa-icon light' icon={ faCalendar } />
                      <span className='para light'>
                        {duration_months === 0 ? ' ' : duration_months }
                        {' '}
                        {_.capitalize(duration_type)}
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon className='custom-fa-icon light' icon={ faDollarSign } />
                      <span className='para bold'>
                        {pay_amount}
                        /hr
                      </span>
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
}

OpenJobPositionCard.defaultProps = {
  fulfilled: 0,
  inNeed: 0,
}

OpenJobPositionCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  fulfilled: PropTypes.number,
  inNeed: PropTypes.number,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
}

export default OpenJobPositionCard
