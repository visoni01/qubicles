import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box, Card, CardMedia, CardContent, Grid, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style.scss'
import { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'
import ConfirmationModal from '../../../../../components/CommonModal/confirmationModal'
import { allCoursesRequestStart } from '../../../../../redux-saga/redux/people'

const DraftCourseCard = ({
  courseId, price, title, sectionsCount, language, thumbnailImage,
  creatorName,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [ openDeleteConfirmation, setOpenDeleteConfirmation ] = useState(false)

  const handleDelete = useCallback(() => {
    dispatch(allCoursesRequestStart({
      requestType: 'DELETE',
      courseId,
    }))

    setOpenDeleteConfirmation(false)
  }, [ dispatch, courseId ])

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
          {_.isEmpty(title)
            ? <p className='para light card-title'>(empty)</p>
            : <b className='h4 card-title'>{title}</b>}
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
          <Button
            className='is-fullwidth mt-10'
            classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            onClick={ () => history.push(`${ EDIT_COURSE_ROUTE }/${ courseId }`) }
          >
            Edit Course
          </Button>
          <Button
            className='is-fullwidth mt-10'
            classes={ { root: 'button-secondary-small-red', label: 'button-secondary-small-label' } }
            onClick={ () => setOpenDeleteConfirmation(true) }
          >
            Delete Course
          </Button>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={ openDeleteConfirmation }
        confirmButtonText='Delete'
        message='Are you sure you want to delete this course?'
        handleClose={ () => setOpenDeleteConfirmation(false) }
        handleConfirm={ handleDelete }
      />
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
