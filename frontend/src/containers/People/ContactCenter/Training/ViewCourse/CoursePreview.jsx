import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line import/no-cycle
import CourseContents from './CourseContents'
import {
  sectionsPropType, isEnrolledPropType, introVideoPropType, courseIdPropType,
  setOpenCoursePlayerPropType, setCurrentSectionPropType, setCurrentUnitPropType,
  courseTitlePropType, unitPropType, sectionPropType,
} from './propTypes'

const CoursePreview = ({
  open, onClose, sections, courseTitle, currentSection, currentUnit, courseId, setOpenCoursePlayer,
  isEnrolled, introVideo, setCurrentSection, setCurrentUnit,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    classes={ { paper: 'course-preview-modal' } }
    className='custom-modal'
    fullWidth
    maxWidth='lg'
  >
    <div className='display-inline-flex'>
      <div className='dialog-left-side ml-20 mr-10'>
        <h3 className='h3'> Overview </h3>
        <CourseContents
          isPreview={ false }
          setOpenCoursePlayer={ setOpenCoursePlayer }
          sections={ sections }
          courseId={ courseId }
          isEnrolled={ isEnrolled }
          introVideo={ introVideo }
          setCurrentSection={ setCurrentSection }
          setCurrentUnit={ setCurrentUnit }
          currentSection={ currentSection }
          currentUnit={ currentUnit }
          isCoursePlayerOpen
        />
      </div>
      <div className='dialog-right-side'>
        <div className='display-inline-flex justify-between no-padding-bottom'>
          <DialogTitle className='is-fullwidth'>
            <h4 className='h4 mt-10'>
              {courseTitle}
            </h4>
          </DialogTitle>
          <DialogActions className='cross-button'>
            <IconButton className='is-size-6' onClick={ onClose }>
              <FontAwesomeIcon className='custom-fa-icon' icon={ faTimes } />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>
          <h3 className='h3 mb-10 light'>
            {`${ currentSection.title }: `}
            <span className='h3'>
              {currentUnit.title}
            </span>
          </h3>
          {currentUnit.type === 'Video' && (
          <div className='post-image'>
            <img alt={ currentUnit.title } src='https://picsum.photos/896/504' />
          </div>
          )}
          {currentUnit.type === 'Article' && (
          <div className='para sz-xl'>
            {currentUnit.details}
          </div>
          )}
        </DialogContent>
      </div>
    </div>
  </Dialog>
)

CoursePreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sections: sectionsPropType.isRequired,
  isEnrolled: isEnrolledPropType.isRequired,
  introVideo: introVideoPropType.isRequired,
  setOpenCoursePlayer: setOpenCoursePlayerPropType.isRequired,
  setCurrentSection: setCurrentSectionPropType.isRequired,
  setCurrentUnit: setCurrentUnitPropType.isRequired,
  courseTitle: courseTitlePropType.isRequired,
  currentUnit: unitPropType.isRequired,
  currentSection: sectionPropType.isRequired,
  courseId: courseIdPropType.isRequired,
}

export default CoursePreview
