import React from 'react'
import {
  Box, Card, CardMedia, CardContent,
} from '@material-ui/core'
import './style.scss'
import { Rating } from '@material-ui/lab'

const CourseBox = ({
  priceQbe, priceUsd, ratingValue, studentsCount, courseDescription, sectionsCount, language, imageUrl,
}) => (
  <div className='course-card-container'>
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
      <CardContent>
        <div>
          <Rating
            className='course-rating'
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
  </div>
)

CourseBox.defaultProps = {
  priceQbe: 12,
  priceUsd: 12,
  ratingValue: 4.5,
  studentsCount: 503,
  courseDescription: 'Pojyim distinctio culpa error quis illum ut similique expedita, veritatis sint quae adipisci.',
  sectionsCount: 8,
  language: 'English',
  imageUrl: 'https://picsum.photos/400/300',
}

export default CourseBox
