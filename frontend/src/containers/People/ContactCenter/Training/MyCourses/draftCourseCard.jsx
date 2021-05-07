import React from 'react'
import {
  Box, Card, CardMedia, CardContent, Grid, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import '../style.scss'
import { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'

const DraftCourseCard = ({
  courseId, price, title, sectionsCount, language, thumbnailImage,
  creatorName,
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
          <b className='h4 card-title'>
            {title}
          </b>
          <p className='para light creatorName'>
            {creatorName}
          </p>
          <div className='course-sections mt-10'>
            <span className='para light mr-5'>
              {`${ sectionsCount } ${ sectionsCount === 1 ? 'Section' : 'Sections' }`}
            </span>
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
  thumbnailImage: '',
}

DraftCourseCard.propTypes = {
  price: PropTypes.number.isRequired,
  sectionsCount: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  thumbnailImage: PropTypes.string,
  creatorName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
}

export default DraftCourseCard
