import React from 'react'
import {
  Box, Card, CardMedia, CardContent, Grid, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import '../style.scss'
import { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'

const DraftCourseCard = ({
  courseId, price, ratingValue, studentsCount, title, sectionsCount, language, thumbnailImage,
  description,
}) => {
  const history = useHistory()
  return (
    <Grid xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } item>
      <Card
        className='course-card'
      >
        <Box className='custom-box no-padding price-overlay'>
          <p className='h3 price-qbe text-center'>
            { `${ price } `}
            <span className='h3 unbold'>QBE</span>
          </p>
          <p className='para light price-usd text-center'>
            {`$${ price } USD`}
          </p>
        </Box>
        <CardMedia
          image={ thumbnailImage }
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
              precision={ 0.1 }
            />
            <span className='para light margin-left-right-5 text-center'>{`${ studentsCount } students`}</span>
          </div>
          <b className='h4'>
            {title}
          </b>
          <p className='para light description'>
            {description}
          </p>
          <div className='course-sections mt-10'>
            <span className='para light mr-5'>{`${ sectionsCount } Sections`}</span>
            <span className='para light ml-5'>{language}</span>
          </div>
          <div className='mt-10'>
            <Button
              className='is-fullwidth'
              classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
              onClick={ () => history.push(`${ EDIT_COURSE_ROUTE }/${ courseId }`) }
            >
              Edit Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

DraftCourseCard.defaultProps = {
  price: 12,
  ratingValue: 4.5,
  studentsCount: 503,
  title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  description: '',
  sectionsCount: 8,
  language: 'English',
  thumbnailImage: 'https://picsum.photos/400/300',
}

DraftCourseCard.propTypes = {
  price: PropTypes.number,
  ratingValue: PropTypes.number,
  studentsCount: PropTypes.number,
  title: PropTypes.string,
  sectionsCount: PropTypes.number,
  language: PropTypes.string,
  thumbnailImage: PropTypes.string,
  description: PropTypes.string,
  courseId: PropTypes.number.isRequired,
}

export default DraftCourseCard
