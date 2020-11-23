import React, { useCallback, useEffect } from 'react'
import {
  faChevronLeft, faUserFriends, faRedo, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { contactCenterIntroduction } from '../testData'
import Introduction from '../Introduction'
import ROUTE_PATHS from '../../../../routes/routesPath'
import './styles.scss'
import { jobPostCompanyDetailsFetchStart } from '../../../../redux-saga/redux/actions'

const ContactCenterIntro = ({ jobDetails }) => {
  const history = useHistory()
  const handleBackButton = useCallback(() => {
    history.push(ROUTE_PATHS.PEOPLE_JOBS_TAB)
  }, [ history ])

  const { companyDetails } = useSelector((state) => state.jobPostCompanyDetails)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!_.isEmpty(jobDetails) && _.isEmpty(companyDetails)) {
      dispatch(jobPostCompanyDetailsFetchStart({ clientId: jobDetails.clientId }))
    }
  }, [ dispatch, jobDetails ])
  return (
    <>
      <Box className='custom-box contact-center-info-root'>
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
          key={ companyDetails.clientId }
          imageName={ contactCenterIntroduction.imageName }
          rating={ contactCenterIntroduction.rating }
          imageSrc={ contactCenterIntroduction.imageSrc }
          name={ companyDetails.companyName }
          location={ companyDetails.city }
          date={ companyDetails.registrationDate }
          title={ companyDetails.title }
          description={ companyDetails.summary }
        />
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
