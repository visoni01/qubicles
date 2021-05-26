import React from 'react'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box, Card, CardMedia, CardContent, Grid, Button,
} from '@material-ui/core'
import '../style.scss'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'

const EnrolledCourseCard = ({
  courseId, courseTitle, rating, studentsCount, creatorName, sectionsCount, language, courseImage, courseProgress,
}) => {
  const history = useHistory()

  return (
    <Grid xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } item>
      <Card
        className='course-card'
      >
        <Box className='custom-box no-padding progress-overlay'>
          <p className='h3 progress-text'>
            {`${ courseProgress }%`}
          </p>
        </Box>
        <CardMedia
          image={ courseImage }
          className='course-image'
        />
        <CardContent className='course-card-content border-1'>
          <div className='rating-text'>
            <Rating
              className='rating-star no-margin'
              name='read-only'
              readOnly
              size='small'
              value={ rating }
              precision={ 0.1 }
            />
            <span className='para light margin-left-right-5 text-center'>{`${ studentsCount } students`}</span>
          </div>
          <b className='h4 card-title'>
            {courseTitle}
          </b>
          <p className='para light creatorName'>
            {creatorName}
          </p>
          <div className='course-sections mt-10'>
            <span className='para light mr-5'>
              {`${ sectionsCount } ${ sectionsCount === 1 ? 'Section' : 'Sections' }`}
            </span>
            <FontAwesomeIcon className='custom-fa-icon circle-svg' icon={ faCircle } />
            <span className='para light ml-5'>{language}</span>
          </div>
          <div className='mt-10'>
            <Button
              className='is-fullwidth'
              classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
              onClick={ () => history.push({
                pathname: `${ VIEW_COURSE_ROUTE }/${ courseId }`,
                continueCourse: courseProgress < 100,
              }) }
            >
              {courseProgress < 100 ? 'Continue' : 'View'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

EnrolledCourseCard.propTypes = {
  courseId: PropTypes.number.isRequired,
  courseTitle: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  studentsCount: PropTypes.number.isRequired,
  creatorName: PropTypes.string.isRequired,
  sectionsCount: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  courseImage: PropTypes.string.isRequired,
  courseProgress: PropTypes.number.isRequired,
}

export default EnrolledCourseCard
