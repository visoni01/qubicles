import React, { useEffect } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Introduction from '../../Introduction'
import { userDataFetchStart } from '../../../../../redux-saga/redux/user'

const CourseTrainerIntro = () => {
  const { userData } = useSelector((state) => state.userData)
  const { userDetails } = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userDetails && userDetails.user_id) {
      dispatch(userDataFetchStart({ userDetailsId: userDetails.user_id }))
    }
  }, [ userDetails, dispatch ])

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
          date={ userData.date }
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
        >
          View Profile
        </Button>
      </Box>
    </>
  )
}

export default CourseTrainerIntro
