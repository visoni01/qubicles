import React, { useCallback } from 'react'
import {
  faChevronLeft, faAward,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box, Button, Divider,
} from '@material-ui/core'
import '../styles.scss'
import { useHistory } from 'react-router-dom'
import Introduction from '../../Introduction'
import { testResumeIntroduction } from '../../testData'
import ROUTE_PATHS from '../../../../../routes/routesPath'

const ResumeIntro = () => {
  const history = useHistory()
  const handleBackButton = useCallback(() => {
    history.push(ROUTE_PATHS.NEW_PEOPLE)
  })
  return (
    <>
      <Box className='box contact-center-info-root resume-intro-root'>
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
          key={ testResumeIntroduction.name }
          imageName={ testResumeIntroduction.imageName }
          rating={ testResumeIntroduction.rating }
          imageSrc={ testResumeIntroduction.imageSrc }
          name={ testResumeIntroduction.name }
          location={ testResumeIntroduction.location }
          date={ testResumeIntroduction.date }
          title={ testResumeIntroduction.title }
          description={ testResumeIntroduction.description }
        />
        <Divider className='divider' />
        <div className='display-inline-flex agent-specifications is-fullwidth'>
          <div>
            <h4 className='heading'> 7,233 </h4>
            <p> Total Calls </p>
            <h4 className='heading mt-20'> $5K+ </h4>
            <p> Total Earnings </p>
          </div>
          <div>
            <h4 className='heading'> 469h </h4>
            <p> Hours Worked </p>
            <h4 className='heading mt-20'> 12.50$/hour </h4>
            <p> Hourly Wage </p>
          </div>
        </div>

        <Divider className='divider' />
        <div className='agent-specifications'>
          <h4 className='heading  mt-10'>
            Highest Level of Education
          </h4>
          <p className='personal-details'> high level graduate </p>
          <h4 className='heading mt-20'>
            Years of Experience
          </h4>
          <p className='personal-details'> 3+ years</p>
        </div>
        <Divider className='divider' />
        <FontAwesomeIcon className='badges' icon={ faAward } />
      </Box>
    </>
  )
}

export default ResumeIntro
