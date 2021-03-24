/* eslint-disable react/no-danger */
import React from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt, faUserFriends, faBriefcase, faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { getTimeFromNow } from '../../../../utils/common'
import { JOB_APPLICATION_ROUTE } from '../../../../routes/routesPath'
import ApplicationCardActions from './applicationCardActions'

const ApplicationCard = ({
  application, jobDetails, clientDetails, applicationCategoryId,
}) => (

  <div className='list-divider pb-30'>
    <div className='display-inline-flex talent-head'>
      <Avatar alt={ clientDetails.clientName } src={ clientDetails.profileImage } classes={ { root: 'avatar-md' } } />
      <div className='talent-details'>
        <div className='username'>
          <div className='display-inline-flex'>
            <h4 className='h4'>{ clientDetails.clientName }</h4>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 4 }
              precision={ 0.1 }
            />
          </div>
          <span className='para light'>
            {`Received ${ getTimeFromNow(application.createdOn) }`}
          </span>
        </div>
        <p className='para light languages'>
          <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10 custom-fa-icon light' />
          {jobDetails.location}
          <span className='rate para bold mt-5'>
            {`$${ jobDetails.payAmount }/hr`}
          </span>
        </p>
      </div>
    </div>
    <div className='talent-content'>
      <div className='display-inline-flex align-items-center justify-between is-fullwidth'>
        <h4 className='h4 mt-10'>
          {jobDetails.jobTitle}
        </h4>
        <Link
          to={ `${ JOB_APPLICATION_ROUTE }/${ application.applicationId }` }
          className='primary-text-link pr-20'
        >
          View full application
        </Link>
      </div>

      <div className='mb-10 mt-5 para short-description'>
        <p dangerouslySetInnerHTML={ { __html: jobDetails.jobDescription } } />
      </div>
    </div>
    <div className='mb-20 pl-10 pr-10'>
      <ul className='action-buttons display-inline-flex justify-between'>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
          <span className='para bold'>{`${ jobDetails.fulfilled }/${ jobDetails.needed }`}</span>
          <span className='para light ml-5'>Hired</span>
        </li>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faBriefcase } />
          <span className='para light ml-5'>{_.capitalize(jobDetails.jobType)}</span>
        </li>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faSuitcase } />
          <span className='para light ml-5'>
            {jobDetails.durationType === 'months' && `${ jobDetails.durationMonths } Months`}
            {jobDetails.durationType !== 'months' && `${ _.capitalize(jobDetails.durationType) }`}
          </span>
        </li>
      </ul>
    </div>
    <ApplicationCardActions
      application={ application }
      applicationCategoryId={ applicationCategoryId }
    />
  </div>
)

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    applicationId: PropTypes.number.isRequired,
    agentUserId: PropTypes.number.isRequired,
    clientId: PropTypes.number.isRequired,
    jobId: PropTypes.number.isRequired,
    coverLetter: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    updateOn: PropTypes.string.isRequired,
  }).isRequired,
  jobDetails: PropTypes.shape({
    jobId: PropTypes.number.isRequired,
    jobType: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    jobDescription: PropTypes.string.isRequired,
    durationType: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    fulfilled: PropTypes.number.isRequired,
    needed: PropTypes.number.isRequired,
    durationMonths: PropTypes.number.isRequired,
    payAmount: PropTypes.number.isRequired,
  }).isRequired,
  clientDetails: PropTypes.shape({
    clientId: PropTypes.number.isRequired,
    clientName: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,
  applicationCategoryId: PropTypes.number.isRequired,
}

export default ApplicationCard
