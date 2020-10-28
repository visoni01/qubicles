import React, { useCallback } from 'react'
import {
  faChevronLeft, faUserFriends, faRedo, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { contactCenterIntroduction } from '../testData'
import Introduction from '../Introduction'
import ROUTE_PATHS from '../../../../routes/routesPath'
import './styles.scss'

const ContactCenterIntro = () => {
  const history = useHistory()
  const handleBackButton = useCallback(() => {
    history.push(ROUTE_PATHS.NEW_PEOPLE)
  })
  return (
    <>
      <Box className='box contact-center-info-root'>
        <div className='mb-20'>
          <Button
            onClick={ handleBackButton }
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
          key={ contactCenterIntroduction.name }
          imageName={ contactCenterIntroduction.imageName }
          rating={ contactCenterIntroduction.rating }
          imageSrc={ contactCenterIntroduction.imageSrc }
          name={ contactCenterIntroduction.name }
          location={ contactCenterIntroduction.location }
          date={ contactCenterIntroduction.date }
          title={ contactCenterIntroduction.title }
          description={ contactCenterIntroduction.description }
        />
        <div className='member-count'>
          <b> 2K+  </b>
          <p className='mt-10'> Members </p>
        </div>
        <Divider className='divider' />
        <div className='job-post-stats'>
          <div className='data'>
            <FontAwesomeIcon icon={ faUserFriends } />
            6/50 Agents Hired
          </div>
          <div className='data'>
            <FontAwesomeIcon icon={ faRedo } />
            3 Evaluating
          </div>
          <div className='data'>
            <FontAwesomeIcon icon={ faEnvelope } />
            2 Pending Apllication
          </div>
        </div>
      </Box>
    </>
  )
}

export default ContactCenterIntro
