import React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Introduction from '../Introduction'
import './styles.scss'
import JobApplicationStats from './jobApplicationStats'

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
          rating={ 4 }
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
        {!_.isEmpty(jobDetails) && (
        <JobApplicationStats />)}
      </Box>
    </>
  )
}

ContactCenterIntro.propTypes = {
  jobDetails: PropTypes.instanceOf({}).isRequired,
}

export default ContactCenterIntro
