/* eslint-disable camelcase */
import React, { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends, faRedo, faEnvelope, faCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import MenuOptions from '../../../../containers/Shared/menuOptions'
import { DeleteIcon } from '../../../../assets/images/training'
import { deleteJob } from '../../../../redux-saga/redux/people'
import { EditIcon } from '../../../../assets/images/common'

const JobCategoryCard = ({
  categoryTitle, jobs, inNeed, categoryId,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleConfirmModal = useCallback(({ id }) => {
    dispatch(deleteJob({
      categoryId,
      jobId: id,
    }))
  }, [ dispatch, categoryId ])

  return (
    <div className='job-category-card list-divider pb-15' key={ categoryId }>
      <div className='section-heading display-inline-flex is-fullwidth'>
        <h3 className='h3 light'>{ categoryTitle }</h3>
      </div>

      <div>
        {jobs.length && jobs.map(({
          job_id, title, needed, status, fulfilled, pending, evaluating,
        }, index) => (
          <div key={ !job_id ? `${ index } ${ title } ${ categoryId }` : `${ job_id } ${ categoryId }` }>
            <div className='job-info'>
              <div className='job-details is-fullwidth mt-5 mb-10'>
                <h4 className='h4 job-title mb-5'>
                  <Link to={ `${ JOB_ROUTE }/${ job_id }` }>
                    { title }
                    { status === 'draft' ? ' [Draft] ' : null}
                  </Link>
                  <MenuOptions
                    id={ job_id }
                    handleFirstOptionClick={ () => history.push(`${ JOB_ROUTE }/${ job_id }/edit`) }
                    handleConfirmModal={ handleConfirmModal }
                    confirmButtonText='Delete'
                    firstOption='Edit'
                    secondOption='Delete'
                    FirstIcon={ EditIcon }
                    SecondIcon={ DeleteIcon }
                    message='Are you sure you want to delete this job ?'
                  />
                </h4>

                <div className='display-inline-flex align-center is-fullwidth'>
                  <div className='application-status-list'>
                    <ul className='action-buttons display-inline-flex justify-between'>
                      <li>
                        <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
                        <span className='para bold'>{`${ fulfilled }/${ needed || inNeed }`}</span>
                        <span className='para light ml-5'> Hired </span>
                      </li>
                      <li>
                        <FontAwesomeIcon className='custom-fa-icon light' icon={ faRedo } />
                        <span className='para bold'>{evaluating}</span>
                        <span className='para light ml-5'> Evaluating </span>
                      </li>
                      <li>
                        <FontAwesomeIcon className='custom-fa-icon light' icon={ faEnvelope } />
                        <span className='para bold'>{pending}</span>
                        <span className='para light ml-5'> Pending Applications </span>
                      </li>
                    </ul>
                  </div>
                  {pending !== 0 && (
                    <div className='blue-dot-notification'>
                      <FontAwesomeIcon icon={ faCircle } className='custom-fa-icon sz-xs' />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

JobCategoryCard.defaultProps = {
  inNeed: 0,
}

JobCategoryCard.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  inNeed: PropTypes.number,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
}

export default JobCategoryCard
