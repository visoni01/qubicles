import React from 'react'
import { Box, InputBase, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import CourseBox from './CourseBox'
import { courseCards } from './testData'

const TrainingWrap = () => (
  <div>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <div className='search-input'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
        <InputBase
          placeholder='Search Courses'
          className='input-field'
        />
      </div>
      <Button
        className='search-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        Create Course
      </Button>
    </div>
    <Box className='box'>
      <h3 className='courses-heading'>All Courses</h3>
      <div className='courses-container'>
        {courseCards.map((cardInfo) => (
          <CourseBox
            key={ cardInfo.courseId }
            priceQbe={ cardInfo.priceQbe }
            priceUsd={ cardInfo.priceUsd }
            ratingValue={ cardInfo.ratingValue }
            studentsCount={ cardInfo.studentsCount }
            courseDescription={ cardInfo.courseDescription }
            sectionsCount={ cardInfo.sectionsCount }
            language={ cardInfo.language }
            imageUrl={ cardInfo.imageUrl }
          />
        ))}
      </div>
    </Box>
  </div>
)

export default TrainingWrap
