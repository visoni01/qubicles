import React, { useCallback, useEffect } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import Introduction from '../../../../../components/CommonModal/Introduction'
import { userDataFetchStart } from '../../../../../redux-saga/redux/user'
import { creatorIdPropType } from './propTypes'
import IntroductionSkeleton from
  '../../../../../components/People/ContactCenter/SkeletonLoader/Jobs/contactCenterSkeleton'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../../../../routes/routesPath'

const CourseTrainerIntro = ({ creatorId }) => {
  const { isLoading, userData } = useSelector((state) => state.userData)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (creatorId) {
      dispatch(userDataFetchStart({ userDetailsId: creatorId }))
    }
  }, [ creatorId, dispatch ])

  const handleClick = useCallback(() => {
    if (_.isEqual(userData.userCode, 'employer')) {
      history.push(`${ COMPANY_PROFILE_ROUTE }/${ creatorId }/feed`)
    } else {
      history.push(`${ PROFILE_ROUTE }/${ creatorId }/feed`)
    }
  }, [ creatorId, history, userData ])

  if (isLoading === null || isLoading) {
    return <IntroductionSkeleton />
  }
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
          key={ userData.name }
          imageName={ userData.imageName }
          rating={ userData.rating }
          imageSrc={ userData.companyImg }
          name={ userData.name }
          location={ userData.location }
          date={ userData.registrationDate }
        />
        <h4 className='h4 margin-top-bottom-10'>
          {userData.title}
        </h4>
        <p className='para mb-10'>
          {userData.summary}
        </p>
        <Button
          classes={ {
            root: 'button-primary-text mt-10',
            label: 'button-primary-text-label',
          } }
          onClick={ handleClick }
        >
          View Profile
        </Button>
      </Box>
    </>
  )
}

CourseTrainerIntro.defaultProps = {
  creatorId: null,
}

CourseTrainerIntro.propTypes = {
  creatorId: creatorIdPropType,
}

export default CourseTrainerIntro
