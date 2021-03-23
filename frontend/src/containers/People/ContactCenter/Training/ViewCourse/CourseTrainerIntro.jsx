import React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@material-ui/core'
import { courseTrainerIntroduction } from '../testData'
import Introduction from '../../Introduction'

const CourseTrainerIntro = () => (
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
        key={ courseTrainerIntroduction.name }
        imageName={ courseTrainerIntroduction.imageName }
        rating={ courseTrainerIntroduction.rating }
        imageSrc={ courseTrainerIntroduction.imageSrc }
        name={ courseTrainerIntroduction.name }
        location={ courseTrainerIntroduction.location }
        date={ courseTrainerIntroduction.date }
      />
      <h4 className='h4 margin-top-bottom-10'>
        {courseTrainerIntroduction.title}
      </h4>
      <p className='para mb-10'>
        {courseTrainerIntroduction.description}
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

export default CourseTrainerIntro
