import React from 'react'
import {
  Box, Card, CardMedia, CardContent, Grid,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import './style.scss'
import { useHistory } from 'react-router-dom'
import ROUTE_PATHS from '../../../../routes/routesPath'

const CourseCard = ({
  priceQbe, priceUsd, ratingValue, studentsCount, courseDescription, sectionsCount, language, imageUrl,
}) => {
  const history = useHistory()
  return (
    <Grid xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } item>
      <Card
        className='course-card'
        onClick={ () => history.push(ROUTE_PATHS.VIEW_COURSE) }
      >
        <Box className='price-overlay'>
          <p className='h3 price-qbe'>
            { `${ priceQbe } `}
            <span className='h3 unbold'>QBE</span>
          </p>
          <p className='para light price-usd'>
            {`$${ priceUsd } USD`}
          </p>
        </Box>
        <CardMedia
          image={ imageUrl }
          className='course-image'
        />
        <CardContent className='course-card-content'>
          <div className='rating-text'>
            <Rating
              className='rating-star no-margin'
              name='read-only'
              readOnly
              size='small'
              value={ ratingValue }
              precision={ 0.1 }
            />
            <span className='para light total-students'>{`${ studentsCount } students`}</span>
          </div>
          <b className='h4 course-description'>
            {courseDescription}
          </b>
          <div className='course-sections'>
            <span className='para light sections'>{`${ sectionsCount } Sections`}</span>
            <span className='para light language'>{language}</span>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

CourseCard.defaultProps = {
  priceQbe: 12,
  priceUsd: 12,
  ratingValue: 4.5,
  studentsCount: 503,
  courseDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry`,
  sectionsCount: 8,
  language: 'English',
  imageUrl: 'https://picsum.photos/400/300',
}

CourseCard.propTypes = {
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
