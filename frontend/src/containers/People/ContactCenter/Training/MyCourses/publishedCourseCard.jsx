import React from 'react'
import {
  Box, Card, CardMedia, CardContent, Grid, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import '../style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'

const PublishedCourseCard = ({
  enrolledThisMonth, totalEarned, testEntries,
  courseId, price, rating, studentsCount, title, sectionsCount, language, thumbnailImage,
  creatorName, ratingsCount,
}) => {
  const history = useHistory()
  return (
    <Grid xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } item>
      <Card
        className='course-card'
        onClick={ () => history.push(`${ VIEW_COURSE_ROUTE }/${ courseId }`) }
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
        {testEntries > 0 && (
        <div className='overlay-button'>
          <Button
            className='is-fullwidth'
            classes={ {
              root: 'button-primary-small overlay-button',
              label: 'button-primary-small-label',
            } }
            startIcon={
              <FontAwesomeIcon icon={ faArrowRight } className='custom-fa-icon white' />
            }
            endIcon={
              <span className='para primary test-count-icon'>{`${ testEntries }+`}</span>
            }
          >
            Please check new test entries
          </Button>
        </div>
        )}
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
              value={ rating }
              precision={ 0.1 }
            />
            <span className='para light margin-left-right-5 text-center'>{`${ ratingsCount } students`}</span>
          </div>
          <b className='h4 card-title'>
            {title}
          </b>
          <p className='para light description'>
            {creatorName}
          </p>
          <div className='course-sections mt-10'>
            <span className='para light mr-5'>
              {`${ sectionsCount } ${ sectionsCount === 1 ? 'Section' : 'Sections' }`}
            </span>
            <span className='para light ml-5'>{language}</span>
          </div>
          <div className='mt-10'>
            <div className='list-divider no-margin display-inline-flex justify-between is-fullwidth pt-5 pb-10'>
              <h4 className='h4'> Enrolled this month</h4>
              <h4 className='h4'>{enrolledThisMonth}</h4>
            </div>
            <div className='list-divider no-margin display-inline-flex justify-between is-fullwidth pt-5 pb-10'>
              <h4 className='h4'> Total students</h4>
              <h4 className='h4'>{studentsCount}</h4>
            </div>
            <div className='list-divider no-margin display-inline-flex justify-between is-fullwidth pt-5 pb-10'>
              <h4 className='h4'> Total Earned</h4>
              <div>
                <h4 className='h4 text-align-end'>{`${ totalEarned } QBE`}</h4>
                <span className='para light'>{`$${ totalEarned } USD`}</span>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <Button
              className='is-fullwidth'
              classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            >
              View Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

PublishedCourseCard.defaultProps = {
  totalEarned: 6223,
  ratingsCount: 25,

}

PublishedCourseCard.propTypes = {
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  studentsCount: PropTypes.number.isRequired,
  enrolledThisMonth: PropTypes.number.isRequired,
  totalEarned: PropTypes.number,
  testEntries: PropTypes.number.isRequired,
  sectionsCount: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  thumbnailImage: PropTypes.string.isRequired,
  creatorName: PropTypes.string.isRequired,
  ratingsCount: PropTypes.number,
  title: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
}

export default PublishedCourseCard
