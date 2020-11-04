import React, { useCallback } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { courseTrainerIntroduction } from '../testData'
import Introduction from '../../Introduction'
import ROUTE_PATHS from '../../../../../routes/routesPath'

const CourseTrainerIntro = () => {
  const history = useHistory()
  const handleBackButton = useCallback(() => {
    history.push(ROUTE_PATHS.NEW_PEOPLE)
  })
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
          key={ courseTrainerIntroduction.name }
          imageName={ courseTrainerIntroduction.imageName }
          rating={ courseTrainerIntroduction.rating }
          imageSrc={ courseTrainerIntroduction.imageSrc }
          name={ courseTrainerIntroduction.name }
          location={ courseTrainerIntroduction.location }
          date={ courseTrainerIntroduction.date }
          title={ courseTrainerIntroduction.title }
          description={ courseTrainerIntroduction.description }
        />
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
