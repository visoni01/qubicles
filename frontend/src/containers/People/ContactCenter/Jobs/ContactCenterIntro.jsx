import React from 'react'
import {
  faChevronLeft, faUserFriends, faRedo, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Introduction from '../Introduction'
import './styles.scss'

const ContactCenterIntro = ({ jobDetails }) => {
  const { settings } = useSelector((state) => state.clientDetails)
  return (
    <>
      <Box className='custom-box contact-center-info-root'>
        <div className='mb-20'>
          <Button
            onClick={ () => window.history.back() }
            classes={ {
              root: 'MuiButtonBase-root button-primary-small',
              label: 'MuiButton-label button-primary-small-label',
            } }
          >
            <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
            Back
          </Button>
        </div>
        <Introduction
          key={ jobDetails.clientId }
          imageName={ settings.companyName }
          rating='4'
          imageSrc={ settings.profilePic }
          name={ settings.companyName }
          location={ `${ settings.city }, ${ settings.state } ` }
          date={ settings.registrationDate }
        />
        <h4 className='h4 margin-top-bottom-10'>
          {settings.title}
        </h4>
        <p className='para'>
          {settings.summary}
        </p>
        <div className='para mt-20'>
          <span className='para bold'> 2K+  </span>
          <p className='mt-10'> Members </p>
        </div>
        <Divider className='divider' />
        <div className='job-post-stats'>
          <div className='data'>
            <FontAwesomeIcon className='custom-fa-icon light' icon={ faUserFriends } />
            <span className='para bold'>
              {' '}
              0/
              {jobDetails.needed}
              {' '}
            </span>
            <span className='para light'> Agents Hired  </span>
          </div>
          <div className='data'>
            <FontAwesomeIcon className='custom-fa-icon light' icon={ faRedo } />
            <span className='para bold'> 3 </span>
            <span className='para light'> Evaluating  </span>
          </div>
          <div className='data'>
            <FontAwesomeIcon className='custom-fa-icon light' icon={ faEnvelope } />
            <span className='para bold'> 2  </span>
            <span className='para light'> Pending Apllication  </span>
          </div>
        </div>
      </Box>
    </>
  )
}

ContactCenterIntro.propTypes = {
  jobDetails: PropTypes.instanceOf({}).isRequired,
}

export default ContactCenterIntro
