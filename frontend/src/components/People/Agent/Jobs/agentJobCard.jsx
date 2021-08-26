/* eslint-disable react/no-danger */
import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt, faUserFriends, faBriefcase, faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { JOB_ROUTE } from '../../../../routes/routesPath'
import '../../../../containers/People/ContactCenter/Talent/styles.scss'

const AgentJobCard = ({
  job,
}) => (
  <div className='list-divider pb-10'>
    <div className='display-inline-flex talent-head'>
      <Avatar alt={ job.clientName } src={ job.clientPic } classes={ { root: 'avatar-md' } } />
      <div className='talent-details'>
        <div className='username'>
          <div className='display-inline-flex'>
            <h4 className='h4'>{job.clientName}</h4>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ job.clientRating }
              precision={ 0.5 }
            />
          </div>
          <Link
            to={ `${ JOB_ROUTE }/${ job.jobId }` }
            className='primary-text-link  ml-10 mr-10'
          >
            View Job Post
          </Link>
        </div>
        <p className='para light languages'>
          <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10 custom-fa-icon light' />
          {job.clientLocation}
          <span className='rate para bold mt-5 mr-10'>
            {`$${ job.payAmount }/hr`}
          </span>
        </p>
      </div>
    </div>
    <div className='talent-content'>
      <h4 className='mt-10 h4'>
        {job.title}
      </h4>
      <div className='mb-10 mt-5 para short-description'>
        <p className='para' dangerouslySetInnerHTML={ { __html: job.description } } />
      </div>
    </div>
    <div className='mb-10 pl-10 pr-10'>
      <ul className='action-buttons display-inline-flex justify-between'>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
          <span className='para bold'>{`${ job.fulfilled }/${ job.needed }`}</span>
          <span className='para light ml-5'>Hired</span>
        </li>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faBriefcase } />
          <span className='para light ml-5'>{_.capitalize(job.jobType)}</span>
        </li>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faSuitcase } />
          <span className='para light ml-5'>
            {job.durationMonths === 0 ? null : job.durationMonths }
            {' '}
            {_.capitalize(job.durationType)}
          </span>
        </li>
      </ul>
    </div>
  </div>
)

AgentJobCard.propTypes = {
  job: PropTypes.shape({
    jobId: PropTypes.number,
    clientName: PropTypes.string,
    clientPic: PropTypes.string,
    clientRating: PropTypes.number,
    clientLocation: PropTypes.string,
    payAmount: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    jobType: PropTypes.string,
    needed: PropTypes.number,
    durationMonths: PropTypes.number,
    durationType: PropTypes.string,
    fulfilled: PropTypes.number,
  }).isRequired,
}

export default AgentJobCard
