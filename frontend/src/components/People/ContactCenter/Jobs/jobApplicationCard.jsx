import React from 'react'
import {
  Avatar,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'
import { Link } from 'react-router-dom'
import { PEOPLE_ROUTE } from '../../../../routes/routesPath'
import { getTimeFromNow } from '../../../../utils/common'
import JobApplicationButtons from '../../../../containers/People/ContactCenter/Jobs/jobApplicationButtons'

const JobApplicationCard = ({ application, userDetails }) => (
  <div className='list-divider pb-15 pt-10'>
    <div className='display-inline-flex job-application-head '>
      <Avatar
        className='profile-pic no-margin-top no-margin-left'
        alt={ userDetails.fullName }
        src={ userDetails.profileImage }
      />
      <div className='candidate-info'>
        <div className='head-with-link'>
          <div className='candidate-head'>
            <h4 className='h4'>{userDetails.fullName}</h4>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ userDetails.rating }
              precision={ 0.5 }
            />
          </div>
          <Link to={ `${ PEOPLE_ROUTE }/job/applications/${ application.applicationId }` }>
            <span className='primary-text-link float-right'> View full application </span>
          </Link>
        </div>
        <p className='para light sz-sm '>{userDetails.title}</p>
      </div>
    </div>
    <p className='para light mt-15 mb-5'>{`Received ${ getTimeFromNow(application.createdOn) }`}</p>

    <p className='para short-description'>{userDetails.summary}</p>

    <JobApplicationButtons
      application={ application }
      userDetails={ userDetails }
    />
  </div>
)

JobApplicationCard.defaultProps = {
  userDetails: {
    fullName: '',
    profileImage: '',
    title: '',
    summary: '',
    rating: 0,
  },
}

JobApplicationCard.propTypes = {
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
  userDetails: PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    rating: PropTypes.number,
  }),
}

export default JobApplicationCard
