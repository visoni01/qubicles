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
import { applicationPropTypes, clientDetailsPropTypes, jobDetailsPropTypes } from './propTypes'

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
              value={ clientDetails.rating }
              precision={ 0.5 }
            />
          </div>
          <span className='para light'>
            {`Received ${ getTimeFromNow(application.createdOn) }`}
          </span>
        </div>
        <p className='para light languages'>
          <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10 custom-fa-icon light' />
          {jobDetails.location}
          <span className='rate para bold mt-5'>{`$${ jobDetails.payAmount }/hr`}</span>
        </p>
      </div>
    </div>
    <div className='talent-content'>
      <div className='display-inline-flex align-items-center justify-between is-fullwidth'>
        <h4 className='h4 mt-10'>{jobDetails.jobTitle}</h4>
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
          <span className='para light ml-5'> Hired </span>
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
      jobDetails={ jobDetails }
      clientDetails={ clientDetails }
    />
  </div>
)

ApplicationCard.propTypes = {
  application: applicationPropTypes.isRequired,
  jobDetails: jobDetailsPropTypes.isRequired,
  clientDetails: clientDetailsPropTypes.isRequired,
  applicationCategoryId: PropTypes.number.isRequired,
}

export default ApplicationCard
