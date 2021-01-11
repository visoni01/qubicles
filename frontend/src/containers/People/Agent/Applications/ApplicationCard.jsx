import React from 'react'
import { Avatar, Button, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt, faUserFriends, faBriefcase, faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import { good } from '../../../../assets/images/avatar'

const ApplicationCard = ({
  applicationType,
  candidateName, candidatePic,
  candidateRating, location,
  ratePerHourDollar, profileName,
  profileDescription,
}) => (
  <div>
    <h3 className='h3 mb-20'>{applicationType}</h3>
    <div className='list-divider'>
      <div className='display-inline-flex talent-head'>
        <Avatar alt={ candidateName } src={ candidatePic } classes={ { root: 'avatar-md' } } />
        <div className='talent-details'>
          <div className='username'>
            <div className='display-inline-flex'>
              <h4 className='h4'>{candidateName}</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ candidateRating }
                precision={ 0.1 }
              />
            </div>
            <span className='para light'>
              Recieved 2 hours ago
            </span>
          </div>
          <p className='para light languages'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10 custom-fa-icon light' />
            {location}
            <span className='rate para bold mt-5'>
              {`$${ ratePerHourDollar }/hr`}
            </span>
          </p>
        </div>
      </div>
      <div className='talent-content'>
        <h4 className='mt-10 h4'>
          {profileName}
        </h4>
        <div className='mb-10 mt-5 para short-description'>
          {`${ profileDescription }`}
        </div>
      </div>
      <div className='mb-20 pl-10 pr-10'>
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
      <Grid container spacing={ 3 } justify='space-between'>
        <Grid item xs={ 6 }>
          <Button
            classes={ {
              root: 'button-secondary-small-red',
              label: 'button-secondary-small-label',
            } }
          >
            Reject
          </Button>
        </Grid>
        <Grid item xs={ 6 } container spacing={ 3 } justify='flex-end'>
          <Grid item>
            <Button
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Message
            </Button>
          </Grid>
          <Grid item>
            <Button
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
            >
              Accept
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </div>
)

ApplicationCard.defaultProps = {
  applicationType: 'Invitations',
  candidateName: 'Good Call Center',
  candidatePic: good,
  candidateRating: 4.5,
  location: 'San Francisco, CA',
  ratePerHourDollar: 13,
  profileName: 'Looking For Expirienced Customer Service Expert',
  profileDescription: `I have over 15 years of experience in telemarketing and lead generation.
  I also have over 5 years of experience in management, quality control and supervision.
  I do have the ability and update your contact list in real time of experience in management, quality
  control and supervision.I do have the ability and update your contact list in real time `,
}

ApplicationCard.propTypes = {
  applicationType: PropTypes.string,
  candidateName: PropTypes.string,
  candidatePic: PropTypes.string,
  candidateRating: PropTypes.number,
  location: PropTypes.string,
  ratePerHourDollar: PropTypes.number,
  profileName: PropTypes.string,
  profileDescription: PropTypes.string,
}

export default ApplicationCard
