import React from 'react'
import {
  faChevronLeft, faRedo, faUserFriends, faEnvelope, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button, Divider,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { good } from '../../../../assets/images/avatar'
import './styles.scss'

const ContactCenterIntro = () => (
  <>
    <Box className='box contact-center-info-root'>
      <div className='mb-20'>
        <Button
          classes={ {
            root: 'MuiButtonBase-root button-primary-small',
            label: 'MuiButton-label button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
          Back
        </Button>
      </div>
      <div className='display-inline-flex contact-center-head'>
        <Avatar className='profile-pic' alt='good' src={ good } />
        <div className='company-info-wrapper'>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='small'
            value={ 5 }
            precision={ 0.1 }
          />
          <div className='company-info'>

            <h4>Good Call Center</h4>
            <p className='location'>
              <FontAwesomeIcon icon={ faMapMarkerAlt } />
              San Francisco, CA
            </p>
            <p className='date'> Member since 11/2020 </p>
          </div>
        </div>
      </div>
      <h4 className='contact-center-title'>
        Innovative Call Center
      </h4>
      <p className='description'>
        Whether you're looking for work in a contact center, seeking cloud-based contact center software or you're in
        the market for talent, we've got you covered. Powered by blockchain smart contracts with no middlemen involved,
        our patent-pending technology ensures the right agent is matched to the right position at the right time.
        Members of our team have been on the battlefield as agents, supervisors and executives. We know firsthand how
        irate customers respond, what makes employees happy, the key performance metrics for contact centers, and how
        the right technology can make a difference.
      </p>
      <div className='member-count'>
        <b> 2K+  </b>
        <p className='mt-10'> Members </p>
      </div>
      <Divider className='divider' />
      <div>
        <ul className='display-inline-flex action-buttons'>
          <li>
            <FontAwesomeIcon icon={ faUserFriends } />
            6/50 Agents Hired
          </li>
          <li>
            <FontAwesomeIcon icon={ faRedo } />
            3 Evaluating
          </li>
          <li>
            <FontAwesomeIcon icon={ faEnvelope } />
            2 Pending Apllication
          </li>
        </ul>
      </div>
    </Box>
  </>
)

export default ContactCenterIntro
