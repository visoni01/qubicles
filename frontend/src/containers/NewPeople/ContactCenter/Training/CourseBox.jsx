import React from 'react'
import {
  Box, Card, CardMedia, CardContent, Grid,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import './style.scss'

const CourseCard = ({
  priceQbe, priceUsd, ratingValue, studentsCount, courseDescription, sectionsCount, language, imageUrl,
}) => (
  <Grid xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } item>
    <Card className='course-card'>
      <Box className='price-overlay'>
        <p className='price-qbe'>
          <b>{ `${ priceQbe } `}</b>
          QBE
        </p>
        <p className='price-usd'>
          {`$${ priceUsd } USD`}
        </p>
      </Box>
      <CardMedia
        image={ imageUrl }
        className='course-image'
      />
      <CardContent className='course-card-content'>
        <div>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='small'
            value={ ratingValue }
            precision={ 0.1 }
          />
          <span className='total-students'>{`${ studentsCount } students`}</span>
        </div>
        <b className='course-description'>
          {courseDescription}
        </b>
        <div className='course-sections'>
          <span className='sections'>{`${ sectionsCount } Sections`}</span>
          <span className='language'>{language}</span>
        </div>
      </CardContent>
    </Card>
  </Grid>
)

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
