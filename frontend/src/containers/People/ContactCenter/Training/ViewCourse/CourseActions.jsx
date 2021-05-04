import React, { useState } from 'react'
import {
  Button, Box, Card, CardMedia,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import '../style.scss'
import AssessmentTestModal from './Test/assessmentTestModal'
import BuyCourseModal from './buyCourseModal'

const CourseActions = ({ course }) => {
  const [ isAssessmentModalOpen, setIsAssessmentModalOpen ] = useState(false)
  const [ openBuyCoursePopup, setOpenBuyCoursePopup ] = useState(false)

  return (
    <>
      <Box className='custom-box actions-box'>
        <div className='mb-20'>
          <Card className='course-card'>
            <Box className='custom-box no-padding price-overlay'>
              <p className='h3 price-qbe text-center'>
                { `${ course.informationSection.price } `}
                <span className='h3 unbold'>QBE</span>
              </p>
              <p className='para light price-usd text-center'>
                {`$${ course.informationSection.price } USD`}
              </p>
            </Box>
            <CardMedia
              image={ course.contentSection.thumbnailImage }
              className='course-image round-border'
            />
          </Card>
        </div>
        <>
          <div className='mb-10'>
            {!course.isEnrolled && (
            <Button
              className='wide-button'
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ () => setOpenBuyCoursePopup(true) }
            >
              {course.informationSection.price > 0 ? 'Buy Course' : 'Start Course'}
            </Button>
            )}
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              {!course.isEnrolled ? 'Preview' : 'Continue Course'}
            </Button>
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ () => setIsAssessmentModalOpen(true) }
            >
              Assessment Test
            </Button>
          </div>

          {openBuyCoursePopup && (
            <BuyCourseModal
              open={ openBuyCoursePopup }
              onClose={ () => setOpenBuyCoursePopup(false) }
            />
          )}

          {isAssessmentModalOpen && (
          <AssessmentTestModal
            open={ isAssessmentModalOpen }
            onClose={ () => setIsAssessmentModalOpen(false) }
          />
          )}

          <div className='mb-20'>
            <h4 className='h4'> Rating for this course</h4>
            <div className='rating-text'>
              <Rating
                className='rating-star no-margin-left'
                name='read-only'
                readOnly
                size='small'
                value={ 4.5 }
                precision={ 0.5 }
              />
              <span className='para light'>{`(${ 15 } ratings) `}</span>
              <span className='para light'>{`${ course.studentsEnrolled } students`}</span>
            </div>
          </div>
          <div className='mb-20'>
            <h4 className='h4'> Last updated</h4>
            <span className='para light'>{course.updatedOn}</span>
          </div>
        </>
        {course.informationSection.category && course.informationSection.categoryTitle && (
        <div className='mb-20'>
          <h4 className='h4'>Category</h4>
          <span className='para light'>{course.informationSection.categoryTitle}</span>
        </div>
        )}
        <div className='mb-20'>
          <h4 className='h4'>Language(s)</h4>
          <span className='para light'>{course.informationSection.language}</span>
        </div>
      </Box>
    </>
  )
}

CourseActions.propTypes = {
  course: PropTypes.shape({
    isEnrolled: PropTypes.bool.isRequired,
    studentsEnrolled: PropTypes.number.isRequired,
    updatedOn: PropTypes.string.isRequired,
    informationSection: PropTypes.shape({
      price: PropTypes.number.isRequired,
      category: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      categoryTitle: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
    }).isRequired,
    contentSection: PropTypes.shape({
      thumbnailImage: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
}

export default CourseActions
