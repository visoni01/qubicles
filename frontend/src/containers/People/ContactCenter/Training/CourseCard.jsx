import React from 'react'
import {
  Box, Card, CardMedia, CardContent, Grid,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import './style.scss'
import { VIEW_COURSE_ROUTE } from '../../../../routes/routesPath'

const CourseCard = ({
  courseId, priceQbe, priceUsd, ratingValue, studentsCount, courseDescription, sectionsCount, language, imageUrl,
}) => {
  const history = useHistory()
  return (
    <Grid xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } item>
      <Card
        className='course-card'
        onClick={ () => history.push(`${ VIEW_COURSE_ROUTE }/${ courseId }`) }
      >
        <Box className='custom-box no-padding price-overlay'>
          <p className='h3 price-qbe text-center'>
            { `${ priceQbe } `}
            <span className='h3 unbold'>QBE</span>
          </p>
          <p className='para light price-usd text-center'>
            {`$${ priceUsd } USD`}
          </p>
        </Box>
        <CardMedia
          image={ imageUrl }
          className='course-image'
        />
        <CardContent className='course-card-content border-1'>
          <div className='rating-text'>
            <Rating
              className='rating-star no-margin'
              name='read-only'
              readOnly
              size='small'
              value={ ratingValue }
              precision={ 0.5 }
            />
            <span className='para light margin-left-right-5 text-center'>{`${ studentsCount } students`}</span>
          </div>
          <b className='h4'>
            {courseDescription}
          </b>
          <div className='course-sections mt-10'>
            <span className='para light mr-5'>{`${ sectionsCount } Sections`}</span>
            <span className='para light ml-5'>{language}</span>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

CourseCard.defaultProps = {
  courseId: 123,
  priceQbe: 12,
  priceUsd: 12,
  ratingValue: 4.5,
  studentsCount: 503,
  courseDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  sectionsCount: 8,
  language: 'English',
  imageUrl: 'https://picsum.photos/400/300',
}

CourseCard.propTypes = {
  courseId: PropTypes.number,
  priceQbe: PropTypes.number,
  priceUsd: PropTypes.number,
  ratingValue: PropTypes.number,
  studentsCount: PropTypes.number,
  courseDescription: PropTypes.string,
  sectionsCount: PropTypes.number,
  language: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default CourseCard
