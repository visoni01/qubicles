import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt, faUserFriends, faBriefcase, faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { good } from '../../../../assets/images/avatar'
import ROUTE_PATHS from '../../../../routes/routesPath'

const AgentJobCard = ({
  clientName, clientPic,
  clientRating, location,
  ratePerHourDollar, jobTitle,
  jobDescription,
}) => (
  <div className='list-divider pb-10'>
    <div className='display-inline-flex talent-head'>
      <Avatar alt={ clientName } src={ clientPic } classes={ { root: 'avatar-md' } } />
      <div className='talent-details'>
        <div className='username'>
          <div className='display-inline-flex'>
            <h4 className='h4'>{clientName}</h4>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ clientRating }
              precision={ 0.1 }
            />
          </div>
          <Link
            to={ `${ ROUTE_PATHS.PEOPLE_JOBS_TAB }` }
            className='primary-text-link  ml-10 mr-10'
          >
            View Job Post
          </Link>
        </div>
        <p className='para light languages'>
          <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10 custom-fa-icon light' />
          {location}
          <span className='rate para bold mt-5 mr-10'>
            {`$${ ratePerHourDollar }/hr`}
          </span>
        </p>
      </div>
    </div>
    <div className='talent-content'>
      <h4 className='mt-10 h4'>
        {jobTitle}
      </h4>
      <div className='mb-10 mt-5 para short-description'>
        {`${ jobDescription }`}
      </div>
    </div>
    <div className='mb-10 pl-10 pr-10'>
      <ul className='action-buttons display-inline-flex justify-between'>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
          <span className='para bold'>{`${ 3 }/${ 4 }`}</span>
          <span className='para light ml-5'>Hired</span>
        </li>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faBriefcase } />
          <span className='para light ml-5'>Part-time</span>
        </li>
        <li>
          <FontAwesomeIcon className='custom-fa-icon light' icon={ faSuitcase } />
          <span className='para light ml-5'>Open-ended</span>
        </li>
      </ul>
    </div>
  </div>
)

AgentJobCard.defaultProps = {
  clientName: 'Good Call Center',
  clientPic: good,
  clientRating: 4.5,
  location: 'San Francisco, CA',
  ratePerHourDollar: 13,
  jobTitle: 'Looking For Expirienced Customer Service Expert',
  jobDescription: `I have over 15 years of experience in telemarketing and lead generation.
  I also have over 5 years of experience in management, quality control and supervision.
  I do have the ability and update your contact list in real time of experience in management, quality
  control and supervision.I do have the ability and update your contact list in real time `,
}

AgentJobCard.propTypes = {
  clientName: PropTypes.string,
  clientPic: PropTypes.string,
  clientRating: PropTypes.number,
  location: PropTypes.string,
  ratePerHourDollar: PropTypes.number,
  jobTitle: PropTypes.string,
  jobDescription: PropTypes.string,
}

export default AgentJobCard
